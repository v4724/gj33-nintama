/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { userStalls } from './user-data.ts';
import { defaultStalls, locateStalls } from './official-data.ts';
import type { StallData, PromoStall, PromoLink } from './types.ts';


const locateStallMap = new Map(locateStalls.map(s => [s.id, s]));

// --- Data Consolidation ---
// Create a single source of truth for all stall data.
const allStalls: StallData[] = [];
const promoMap = new Map<string, PromoStall>(userStalls.map(s => [s.id, s]));

// Start with the official list, which now contains ALL stalls.
// Enrich it with promo data and calculate coordinates.
defaultStalls.forEach(ds => {
  const promoData = promoMap.get(ds.id);
  const line = ds.id.substring(0, 1);
  const num = ds.num;
  const desk = ds.desk ?? 1;
  const locateStall = locateStallMap.get(line);

  if (!locateStall) {
    console.warn(`Could not find location data for stall line: ${line}`);
    return;
  }

  // Calculate coordinates
  const coordsTemplate = locateStall.coords;
  let myCoords: NonNullable<StallData['coords']>;

  if (line !== 'I') {
    const numInBlock = num - 1;
    let gapSize = 0;
    if (numInBlock >= 18) {
        gapSize = 6.9;
    } else if (numInBlock >= 10) {
        gapSize = 3.1;
    }
    const top = coordsTemplate.top - (numInBlock * coordsTemplate.height) - gapSize;
    myCoords = {
      top: `${top}%`,
      left: `${coordsTemplate.left}%`,
      width: `${coordsTemplate.width}%`,
      height: `${coordsTemplate.height * desk}%`
    };
  } else {
    const left = coordsTemplate.left + coordsTemplate.width * (num - 1);
    myCoords = {
      top: `${coordsTemplate.top}%`,
      left: `${left}%`,
      width: `${coordsTemplate.width * desk}%`,
      height: `${coordsTemplate.height}%`
    };
  }

  const stallEntry: StallData = {
    id: ds.id,
    name: promoData?.name ?? ds.circleTitle,
    coords: myCoords,
    circleImg: ds.circleImg || undefined,
    circleLink: ds.links || undefined,
    promoUser: promoData?.promoUser,
    promoAvatar: promoData?.promoAvatar,
    promoHTML: promoData?.promoHTML,
    promoLinks: promoData?.promoLinks,
  };

  allStalls.push(stallEntry);
});


// Main application logic
document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map-container');
  const tooltip = document.getElementById('tooltip');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalHeader = document.querySelector('.modal-header');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalFooter = document.getElementById('modal-footer');
  const instructionsEl = document.querySelector('#app p');

  if (!mapContainer || !tooltip || !modal || !modalClose || !modalOverlay || !modalHeader || !modalTitle || !modalBody || !modalFooter || !instructionsEl) {
    console.error('Essential DOM elements not found.');
    return;
  }
  
  let selectedStallElement: HTMLElement | null = null;

  // Create and append stall areas using the unified data
  allStalls.forEach(stall => {
    if (!stall.coords) return; // Only render stalls with coordinates

    const area = document.createElement('div');
    area.className = 'stall-area';
    if (stall.promoUser) {
      area.classList.add('has-promo');
    }
    area.dataset.stallId = stall.id;
    area.style.top = stall.coords.top;
    area.style.left = stall.coords.left;
    area.style.width = stall.coords.width;
    area.style.height = stall.coords.height;
    area.setAttribute('aria-label', `Stall: ${stall.name}`);
    mapContainer.appendChild(area);
  });
  
  // --- Helper Functions ---
  const openModalForStall = (stallId: string) => {
    const stall = allStalls.find(s => s.id === stallId);
    if (!stall) return;

    // Clear previous dynamic content
    const oldUserInfo = modalHeader.querySelector('.modal-user-info');
    if (oldUserInfo) {
      oldUserInfo.remove();
    }

    // Populate header
    modalTitle.textContent = `${stall.id}: ${stall.name}`;
    if (stall.promoUser && stall.promoAvatar) {
      const userInfoEl = document.createElement('div');
      userInfoEl.className = 'modal-user-info';
      userInfoEl.innerHTML = `
        <img src="${stall.promoAvatar}" alt="${stall.promoUser}" class="modal-avatar">
        <span class="modal-username">${stall.promoUser}</span>
      `;
      modalHeader.appendChild(userInfoEl);
    }

    // Populate body
    let bodyHTML = '';
    if (stall.circleImg) {
        bodyHTML += `<img src="${stall.circleImg}" alt="Official Promo Image: ${stall.name}" style="display:block; margin-bottom:15px; border-radius: 8px;" />`;
    }
    if (stall.promoHTML) {
        bodyHTML += stall.promoHTML;
    }
    modalBody.innerHTML = bodyHTML || '暫無宣傳資訊。';


    // Populate footer
    modalFooter.innerHTML = '';
    const allLinks: PromoLink[] = [...(stall.promoLinks || [])];
    if (stall.circleLink && !allLinks.some(l => l.href === stall.circleLink)) {
        allLinks.push({ href: stall.circleLink, text: '社團網站' });
    }
    
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        const linkEl = document.createElement('a');
        linkEl.href = link.href;
        linkEl.textContent = link.text;
        linkEl.className = 'footer-link';
        linkEl.target = '_blank';
        linkEl.rel = 'noopener noreferrer';
        modalFooter.appendChild(linkEl);
      });
    }
    
    // Show modal and prevent body scroll
    document.body.classList.add('body-modal-open');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  };
  
  const clearSelection = () => {
    if (selectedStallElement) {
      selectedStallElement.classList.remove('is-selected');
    }
    selectedStallElement = null;
    tooltip.classList.add('hidden');
    tooltip.classList.remove('static-tooltip');
  };
  
  const selectStall = (stallElement: HTMLElement) => {
    selectedStallElement = stallElement;
    stallElement.classList.add('is-selected');
    
    const stallId = stallElement.dataset.stallId;
    const stall = allStalls.find(s => s.id === stallId);
    if (stall) {
      tooltip.innerHTML = `<strong>${stall.name}</strong><br><small>${stall.id}${stall.promoUser ? ` / ${stall.promoUser}` : ''}</small>`;
      
      const areaRect = stallElement.getBoundingClientRect();
      tooltip.style.left = `${areaRect.left + areaRect.width / 2}px`;
      tooltip.style.top = `${areaRect.top}px`;
      
      tooltip.classList.add('static-tooltip');
      tooltip.classList.remove('hidden');
    }
  };

  const isMobile = () => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || /Mobi|Android/i.test(navigator.userAgent);

  // --- Event Handlers ---

  if (isMobile()) {
    // --- Mobile Interaction: Tap to select, tap again to open ---
    instructionsEl.textContent = '點擊查看攤位，再次點擊查看宣傳資訊。';
    
    mapContainer.addEventListener('touchstart', (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const clickedStallArea = target.closest('.stall-area') as HTMLElement | null;

      if (clickedStallArea) {
        if (clickedStallArea === selectedStallElement) {
          openModalForStall(clickedStallArea.dataset.stallId!);
          clearSelection();
        } else {
          clearSelection();
          selectStall(clickedStallArea);
        }
      } else {
        clearSelection();
      }
    }, { passive: true });

  } else {
    // --- Desktop Interaction: Hover to preview, click to open ---
    instructionsEl.textContent = '滑鼠移到攤位上可查看名稱，點擊可查看宣傳資訊。';

    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (tooltip.classList.contains('static-tooltip')) return;
      tooltip.style.left = `${e.clientX + 15}px`;
      tooltip.style.top = `${e.clientY + 15}px`;
    });
    
    mapContainer.addEventListener('mouseover', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('stall-area') && target !== selectedStallElement) {
        const stallId = target.dataset.stallId;
        const stall = allStalls.find(s => s.id === stallId);
        if (stall) {
          tooltip.classList.remove('static-tooltip');
          tooltip.innerHTML = `<strong>${stall.name}</strong><br><small>${stall.id}${stall.promoUser ? ` / ${stall.promoUser}` : ''}</small>`;
          tooltip.classList.remove('hidden');
        }
      }
    });

    mapContainer.addEventListener('mouseout', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('stall-area') && target !== selectedStallElement) {
        tooltip.classList.add('hidden');
      }
    });

    mapContainer.addEventListener('mousedown', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickedStallArea = target.closest('.stall-area') as HTMLElement | null;

      if (clickedStallArea) {
        openModalForStall(clickedStallArea.dataset.stallId!);
      }
    });
  }

  const closeModal = () => {
    document.body.classList.remove('body-modal-open');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    clearSelection();
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
});
