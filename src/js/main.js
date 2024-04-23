import faq from "./modules/faq";
import wow from "./modules/animated";
import scrollToTheSection from "./modules/scrollToTheSection";
import cookies from "./modules/cookies";
import timer from "./modules/timer";
import addSlider from "./modules/prizesSlider";
import copyClipboard from "./modules/copyClipboard";
import toggleHistoryList from "./modules/modals";
import * as global from "./modules/env";

import verifyPage from "./pages/verify";
import authPage from "./pages/auth";
import accountPage from "./pages/account";
import ticketPage from './pages/ticket';
import historyPage from './pages/history';
import indexPage from "./pages/index";


document.addEventListener('DOMContentLoaded', () => {
  cookies();
  wow.init();
  if(!document.body.classList.contains('ticket-page') && !document.body.classList.contains('history-page')) {
    faq();
  }
  if(document.body.classList.contains('verify-page')) {
    verifyPage();
  } else if(document.body.classList.contains('wallet-page')) {
    authPage();
  } else if(document.body.classList.contains('cabinet-page')) {
    accountPage();
    addSlider();
    copyClipboard();
    toggleHistoryList();
  } else if(document.body.classList.contains('ticket-page')) {
    ticketPage();
  } else if(document.body.classList.contains('history-page')) {
    historyPage();
    toggleHistoryList();
  }
  if(document.body.classList.contains('index')) {
    scrollToTheSection();
    indexPage();
    if(!document.body.classList.contains('winddown')) {
      timer('#mainTimer', '2024/05/1 00:00');
    }
  }
})
