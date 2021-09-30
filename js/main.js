////////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////
const lightColor = "#ffffff";
const darkColor = "#000000";
const navColorNormal = '#222831';
const primaryColor = '#222831';
const accentYellowColor = '#FFD369';
const headerColor = "#eeeeee";

const imageHidden = 'image-hidden';
const revealSlide = 'reveal-slide';
const revealed = 'revealed';
const up = 'up';
const visible = 'visible';
const notRotate = 'not-rotate';
const fadeIn = 'fade-in';

// check if tablet then use transform scroll
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//============================================================================//
//============================ PAGE SPLASH ===================================//
//============================================================================//
function startAnimation() {
    // 1. fades in VISHROY logo
    const blockName = document.querySelectorAll('header .block-name')[0];
    const topBar = document.querySelectorAll('.top-bar')[0];

    setTimeout(function() {
        blockName.classList.add(revealed);
    }, 500);

    //==========================================================================///
    // 2. slide down topBar + set as fixed and scale VISHROY down
    const blockScroll = document.querySelectorAll('.block-scroll')[0];
    const blockAva = document.querySelectorAll('header .block-avatar')[0];
    const blockBtn = document.querySelectorAll('header .block-button')[0];

    setTimeout(function() {
        blockName.style.transition = "all 0.9s ease-in-out"
        blockName.style.transform = 'scale(1)';
        topBar.classList.add(revealSlide);
        topBar.style.position = "fixed";
        blockName.style.top = "0";
        blockName.style.marginBottom = 1.5 + 'rem';

        blockScroll.classList.add(revealed);
        blockScroll.style.transform = 'rotate(90deg)';
    }, 2400);

    //==========================================================================///
    // 3. display intro content and avatar
    setTimeout(function() {
        introSlideUp(true);

        blockAva.classList.add(revealed);
        blockBtn.classList.add(revealed);
    }, 3000);


    function introSlideUp(doSlide) {
        const slideUp = 'slide-up';
        numEle = 1;

        if (doSlide) {
            while (numEle != 4) {
                const introInner = document.querySelectorAll('header div.intro-line:nth-child(' + numEle + ') .intro-inner')[0];
                introInner.classList.add(slideUp);
                numEle++;
            }
        } else {
            const introInner = document.querySelectorAll('header div.intro-line:nth-child(' + numEle + ') .intro-inner')[0];
            introInner.classList.remove(slideUp);
            numEle++;
        }

        const header = document.querySelectorAll('header')[0];
        header.classList.remove(imageHidden);
    }
    //==========================================================================///
    // 3. swipe main content up
    const mainPg = document.querySelectorAll('main')[0];
    const activePg = 'active-page';
    setTimeout(function() {
        mainPg.classList.add(activePg);

    }, 3200);

    setTimeout(function() {
        const scrollSpan = document.querySelectorAll('.block-scroll .container')[0];
        scrollSpan.style.animation = "scrolling 4s infinite";
    }, 4000);
}



////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ELEMENT EVENT //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// NAV BAR : Showing nav menu
let navBarVisible = false;
const btnIconNav = document.querySelectorAll('.block-icon i')[0];
const navBar = document.querySelectorAll('.nav-bar')[0];
let iconMenu = 'menu';
let iconClose = 'close';
let menuOpened = 'menu-opened';
let navBarOpened = 'nav-bar-opened';

function iconMenuClick() {
    if (navBarVisible) {
        closeMenu();
    } else {
        let numLi = 1;
        navBarVisible = true;
        btnIconNav.style.transform = "rotate(90deg)";
        btnIconNav.textContent = iconClose;

        navBar.classList.add(navBarOpened);

        navBar.style.visibility = 'visible';
        while (numLi != 5) {
            const navBarLi = document.querySelectorAll('.nav-bar .nav li:nth-child(' + numLi + ')')[0];
            navBarLi.classList.add(menuOpened);
            numLi++;
        }
    }
}

function closeMenu() {
    let numLi = 1;
    navBarVisible = false;
    btnIconNav.style.transform = "rotate(0)";
    btnIconNav.textContent = iconMenu;

    while (numLi != 5) {
        const navBarLi = document.querySelectorAll('.nav-bar .nav li:nth-child(' + numLi + ')')[0];
        navBarLi.classList.remove(menuOpened);
        numLi++;
    }

    navBar.style.visibility = 'hidden';
    navBar.classList.remove(navBarOpened);
}





// SECTION SKILLS CARDS : Animation of cards on hover
function cardHover(element) {
    const skillCards = document.querySelectorAll('.sect-skills .card:nth-child(' + element + ')')[0];
    skillCards.classList.add('not-rotate');
    skillCards.style.zIndex = '70';
}

function cardHoverOut(element) {
    const skillCards = document.querySelectorAll('.sect-skills .card:nth-child(' + element + ')')[0];
    skillCards.classList.remove('not-rotate');
    skillCards.style.zIndex = '10';
}





////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// BROWSER EVENT //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// loads all animation as soon as all loads
window.addEventListener('load', function(event) {
    startAnimation();
});



// toggles scroll event to manipulate Elements
window.addEventListener("scroll", function(event) {
    // store scrollY value
    let scrollTopVal = this.scrollY;

    if (!(isMobile)) {
        smoothScrollMain(scrollTopVal);
    } else {
        console.log("Mobile : true");
    }

    //show elements when certain postion is reached
    const sectBest = document.querySelectorAll('.sect-best')[0];
    const sectAbout = document.querySelectorAll('.sect-about')[0];
    const sectWorks = document.querySelectorAll('.sect-works')[0];
    const sectSkills = document.querySelectorAll('.sect-skills')[0];
    const sectEdu = document.querySelectorAll('.sect-education')[0];
    const sectContact = document.querySelectorAll('.sect-contact')[0];


    if (isElementVisible(sectBest)) {
        const sectBestTitle = document.querySelectorAll('.sect-best .title')[0];
        const sectBestGallery = document.querySelectorAll('.sect-best .block-gallery .wrapper ')[0];

        if (isElementVisible(sectBestTitle)) {
            sectBestTitle.classList.add(revealed);

            animateMultipleEle(7, true, up, '.sect-best .title h1 span');
        }
        if (isElementVisible(sectBestGallery)) {
            animateMultipleEle(3, true, fadeIn, '.sect-best .block-gallery .item');
        }
    } else if (isElementVisible(sectAbout)) {
        const sectAboutTitle = document.querySelectorAll('.sect-about .title')[0];
        const sectAboutSlogan = document.querySelectorAll('.sect-about .slogan')[0];
        const sectAboutPara = document.querySelectorAll('.sect-about .para')[0];
        const sectAboutParaBlockCurrent = document.querySelectorAll('.sect-about .para .block-current')[0];

        if (isElementVisible(sectAboutTitle)) {
            animateMultipleEle(5, true, up, '.sect-about .title h1 span');
        }
        if (isElementVisible(sectAboutSlogan)) {
            animateMultipleEle(1, true, visible, '.sect-about .slogan div.inner');
        }
        if (isElementVisible(sectAboutPara)) {
            animateMultipleEle(1, true, visible, '.sect-about .para div.inner');
            animateMultipleEle(3, true, up, '.sect-about .block-current div.text');
            animateMultipleEle(1, true, revealed, '.sect-about .profile .inner');
        }
    } else if (isElementVisible(sectWorks)) {
        const sectWorksTitle = document.querySelectorAll('.sect-works .title')[0];
        const sectWorksSlogan = document.querySelectorAll('.sect-works .slogan')[0];
        const sectWorksItemSec = document.querySelectorAll('.sect-works .item:nth-child(2)')[0];
        const sectWorksItemThird = document.querySelectorAll('.sect-works .item:nth-child(3)')[0];

        if (isElementVisible(sectWorksTitle)) {
            animateMultipleEle(5, true, up, '.sect-works .title h1 span');
        }
        if (isElementVisible(sectWorksSlogan)) {
            animateMultipleEle(1, true, visible, '.sect-works .slogan div.inner');
        }

    } else if (isElementVisible(sectSkills)) {
        const sectSkillsTitle = document.querySelectorAll('.sect-skills .title')[0];
        const sectSkillsSlogan = document.querySelectorAll('.sect-skills .slogan')[0];
        const sectSkillsCards = document.querySelectorAll('.sect-skills .card')[0];

        if (isElementVisible(sectSkillsTitle)) {
            animateMultipleEle(6, true, up, '.sect-skills .title h1 span');
        }
        if (isElementVisible(sectSkillsCards)) {
            animateMultipleEle(4, false, notRotate, '.sect-skills .card');
        }
        if (isElementVisible(sectSkillsSlogan)) {
            animateMultipleEle(1, true, visible, '.sect-skills .slogan div.inner');
        }
    } else if (isElementVisible(sectEdu)) {
        const sectEduTitle = document.querySelectorAll('.sect-education .title')[0];
        const sectEduSlogan = document.querySelectorAll('.sect-education .slogan')[0];
        const sectEduPara = document.querySelectorAll('.sect-education .para')[0];
        const sectEduCourse = document.querySelectorAll('.sect-education .para')[0];

        if (isElementVisible(sectEduTitle)) {
            animateMultipleEle(9, true, up, '.sect-education .title h1 span');
        }
        if (isElementVisible(sectEduSlogan)) {
            animateMultipleEle(1, true, visible, '.sect-education .slogan div.inner');
        }
        if (isElementVisible(sectEduPara)) {
            animateMultipleEle(1, true, visible, '.sect-education .para div.inner');
        }
        if (isElementVisible(sectEduCourse)) {
            animateMultipleEle(1, true, revealed, '.bottom-bar .block-scroll');
        }
    } else if (isElementVisible(sectContact)) {
        const sectContactTitle = document.querySelectorAll('.sect-contact .title')[0];
        const sectContactSlogan = document.querySelectorAll('.sect-contact .slogan')[0];
        const sectContactPara = document.querySelectorAll('.sect-contact .para')[0];
        const sectContactSocialLi = document.querySelectorAll('.sect-contact .socials li')[0];

        if (isElementVisible(sectContactTitle)) {
            animateMultipleEle(7, true, up, '.sect-contact .title h1 span');
            animateMultipleEle(1, false, revealed, '.bottom-bar .block-scroll');
        }
        if (isElementVisible(sectContactSlogan)) {
            animateMultipleEle(1, true, visible, '.sect-contact .slogan div.inner');
        }
        if (isElementVisible(sectContactPara)) {
            animateMultipleEle(1, true, visible, '.sect-contact .para div.inner');
        }
        if (isElementVisible(sectContactSocialLi)) {
            animateMultipleEle(8, true, revealed, '.sect-contact .socials li');
        }
    } else {
        console.log('On mobile');
    }
}, false);





////////////////////////////////////////////////////////////////////////////////
////////////////////////////////FUNCTIONS///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// CHANGE COLOR FOR ELEMENTS
function changeBackColor(section, sectColor) {
    const sect = document.querySelectorAll(section)[0];
    sect.style.background = sectColor;
}

function changeNavColor(color) {
    const logo = document.querySelectorAll('.top-bar a')[0];
    const menu = document.querySelectorAll('.top-bar .block-icon i')[0];

    logo.style.color = color;
}



// SCROLL DELAY CALCULATION : Calculate delay for scroll
function calcScrollVal(scrollYVal) {
    let newScrollVal = (scrollYVal / 2 * 3);
    return newScrollVal;
}
// SCROLL DELAY ANIMATION : Delay effect on scrolling
function smoothScrollMain(scrollYVal) {
    let delay = (scrollYVal / 2 * 3);
    let skew = delay / 100 - 2;

    const header = document.querySelectorAll('header')[0];
    const main = document.querySelectorAll('main')[0];
    header.style.transform = "translate3d(0,-" + delay + "px, 0)";
    header.style.backgroundPositionY = delay / 9 + "px";
    main.style.transform = "translate3d(0,-" + delay + "px, 0)";
}



// ANIMATE MULTIPLE ELEMENT: Delay effect on scrolling
function animateMultipleEle(numEle, add, animationClass, elementNth) {
    loop = 1;
    while (loop != numEle + 1) {
        const ele = document.querySelectorAll(elementNth + ':nth-child(' + loop + ')')[0];
        if (add) {
            ele.classList.add(animationClass);
        } else {
            ele.classList.remove(animationClass);
        }
        loop++;
    }
}


// CHECK IF ELEMENT VISIBLE : Get an element and verify if it is in viewport
function isElementVisible(el) {
    var rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || document.documentElement.clientWidth,
        vHeight = window.innerHeight || document.documentElement.clientHeight,
        efp = function(x, y) { return document.elementFromPoint(x, y) };

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 ||
        rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
        el.contains(efp(rect.left, rect.top)) ||
        el.contains(efp(rect.right, rect.top)) ||
        el.contains(efp(rect.right, rect.bottom)) ||
        el.contains(efp(rect.left, rect.bottom))
    );
}




////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ANIMATION///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////