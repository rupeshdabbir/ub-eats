// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import dotsEffect from './modules/dots';
import returnList from './components/alertComponent/alert';
import './components/transaction-list/transaction-list';


(($) => {
  // When DOM is ready
  $(() => {
    // dotsEffect.init();
    returnList();
  });
})(jQuery);
