<script>
    function isElementInViewport(el) {

  // Special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}

function onVisibilityChange(el, callback) {
  var old_visible;
  return function () {
    var visible = isElementInViewport(el);
    if (visible != old_visible) {
        old_visible = visible;
      if (typeof callback == 'function') {
        callback();
      }
    }
  }
}

window.onload = function() {
  var tableData = jQuery('#locations-table').DataTable().data();
  var pendingTableData = jQuery('#pending-locations-table').DataTable().data();
  var i;
  var colNumber = 1;
  var totalMeals = 0;
  var totalPendingMeals = 0;
  var countUp1;
  var countUp2;
  var countUp3;
  var countUp4;
  var countUp5;

  for (i=1; i<(tableData.length); i++)
  {
        thisRowVal = tableData[i][1];
     // try to convert text to numeric
     var thisNumber = parseFloat(thisRowVal);
     // if you didn't get back the value NaN (i.e. not a number), add into result
     if (!isNaN(thisNumber)) {
        totalMeals += thisNumber;
        }
    }
   for (i=1; i<(pendingTableData.length); i++)
   {
        thisRowVal = pendingTableData[i][1];
      // try to convert text to numeric
      var thisNumber = parseFloat(thisRowVal);
      // if you didn't get back the value NaN (i.e. not a number), add into result
      if (!isNaN(thisNumber)) {
        totalPendingMeals += thisNumber;
       }
    }
  var epochDate = new Date(2020,2,20);
  var today = new Date();
  var days =  Math.round((today-epochDate)/(1000*60*60*24));
console.log(days);
  // For estimating total meals to date
  var mealsRate = 149; // average increase in meals per day
  var mealsStartAdj = 1285;
  var estTotalMealsToDate = days*(mealsStartAdj + mealsRate*(days+2)/2);

  countUp1 = new CountUp('total_deliveries', 0, tableData.length, 0, 5);
  countUp2 = new CountUp('total_daily_meals', 0, totalMeals,  0, 5);
  countUp3 = new CountUp('total_meals_served', 0, estTotalMealsToDate,  0, 5);
  countUp4 = new CountUp('pending_locations', 0, pendingTableData.length, 0, 5);
  countUp5 = new CountUp('pending_meals', 0, totalPendingMeals,  0, 5);

  var handler = onVisibilityChange(total_deliveries, function () {
    countUp1.reset();
    countUp2.reset();
    countUp3.reset();
    countUp4.reset();
    countUp5.reset();
    countUp1.start();
    countUp2.start();
    countUp3.start();
    countUp4.start();
    countUp5.start();
  });

  handler(); // start counter on load.
  if (window.addEventListener) {
        addEventListener('DOMContentLoaded', handler, false);
    addEventListener('load', handler, false);
    addEventListener('scroll', handler, false);
    addEventListener('resize', handler, false);
  } else if (window.attachEvent) {
        attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
    attachEvent('onload', handler);
    attachEvent('onscroll', handler);
    attachEvent('onresize', handler);
  }
}

// countUp.min.js
function CountUp(a,b,c,d,e,f){this.options = f || { useEasing: !0, useGrouping: !0, separator: ",", decimal: "." };for(var g=0,h=["webkit","moz","ms"],i=0;i<h.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[h[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[h[i]+"CancelAnimationFrame"]||window[h[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var c=(new Date).getTime(),d=Math.max(0,16-(c-g)),e=window.setTimeout(function(){a(c + d)},d);return g=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});var j=this;this.d="string"==typeof a?document.getElementById(a):a,this.startVal=Number(b),this.endVal=Number(c),this.countDown=this.startVal>this.endVal?!0:!1,this.startTime=null,this.timestamp=null,this.remaining=null,this.frameVal=this.startVal,this.rAF=null,this.decimals=Math.max(0,d||0),this.dec=Math.pow(10,this.decimals),this.duration=1e3*e||2e3,this.easeOutExpo=function(a,b,c,d){return 1024*c*(-Math.pow(2,-10*a/d)+1)/1023+b},this.count=function(a){null === j.startTime && (j.startTime = a), j.timestamp = a;var b=a-j.startTime;if(j.remaining=j.duration-b,j.options.useEasing)if(j.countDown){var c=j.easeOutExpo(b,0,j.startVal-j.endVal,j.duration);j.frameVal=j.startVal-c}else j.frameVal=j.easeOutExpo(b,j.startVal,j.endVal-j.startVal,j.duration);else if(j.countDown){var c=(j.startVal-j.endVal)*(b/j.duration);j.frameVal=j.startVal-c}else j.frameVal=j.startVal+(j.endVal-j.startVal)*(b/j.duration);j.frameVal=Math.round(j.frameVal*j.dec)/j.dec,j.frameVal=j.countDown?j.frameVal<j.endVal?<j.duration?{return j.callback=a,isNaN(j.endVal)||isNaN(j.startVal)?(console.log("countUp error: startVal or endVal is not a number"),j.d.innerHTML="--"):j.rAF=requestAnimationFrame(j.count),!1},this.stop=function(){cancelAnimationFrame(j.rAF)},this.reset=function(){j.startTime = null, cancelAnimationFrame(j.rAF), j.d.innerHTML = j.formatNumber(j.startVal.toFixed(j.decimals))},this.resume=function(){j.startTime = null, j.duration = j.remaining, j.startVal = j.frameVal, requestAnimationFrame(j.count)},this.formatNumber=function(a){a += "";var b,c,d,e;if(b=a.split("."),c=b[0],d=b.length>1?j.options.decimal+b[1]:"",e=/(\d+)(\d{3})/,j.options.useGrouping)for(;e.test(c);)c=c.replace(e,"$1"+j.options.separator+"$2");return c+d},j.d.innerHTML=j.formatNumber(j.startVal.toFixed(j.decimals))}
</script>