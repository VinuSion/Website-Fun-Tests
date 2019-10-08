//Selects the hamburger svg and the individual lines as well so you can animate them
//and also saves them in a variable, each with their given name.
const hamburger = document.querySelector('.hamburger');
const lineOne = hamburger.querySelector('.line-one');
const lineTwo = hamburger.querySelector('.line-two');
const lineThree = hamburger.querySelector('.line-three');

//This Unifies all 3 lines of the hamburger into an array to animate them at the same time
//THE HOVER ONE BASICALLY
const lines = [lineOne, lineTwo, lineThree];

//Basically the name of the (Hover animation) to animate it, which is "tlm".
const tlm = new TimelineMax({});

//Basically the name of the ("X" animation) to animate it, which is "toggleMenu".
//Also sets the animation paused so that it doesn't interfere with the other one,
//and also reversed so that the same animation repeats but backwards.
const toggleMenu = new TimelineMax({paused: true, reversed: true});

//The Hover animation, adds an event listener, that when the mouse hovers over the
//hamburger, it staggers all 3 lines by selecting (lines) and (does the same animation for all 3 lines), adds
//a duration (0.25), scales it on the X axis by 1.5 (1.0 is the default value, so it scales it a bit more),
//repeats 1 time (in this case its 2 because in the first one it scales then in the next one it descales),
//the "yoyo: true" is so that every line scales with a delay after one another of (0.125s),
//the ease part is a GSAP ease pre-made function so that it smoothens things a bit,
//the svgOrigin: "50 50" is just so that the animation starts exactly in the middle of the svg, with 50 scale on the right and 50 on the left.
//Finally, the if statement is so that if the hamburger contains the class 'js-x' it will stop the hover animation
//from playing, so that it doesn't interfere and doesn't look all messy and stuff..
hamburger.addEventListener('mouseenter', () => {
    if (hamburger.classList.contains('js-x')) {
        return;
    }
    tlm.staggerTo(lines, 0.25, {scaleX: 1.5, repeat: 1, yoyo:true, ease: 
        Power2.easeInOut, svgOrigin: "50 50"}, 0.125);
});

//ALL OF THE ANIMATION COMPONENTS ARE IN CRONOLOGICAL ORDER!
//The Click to get an "X" animation, first it animates the second line of the hamburger, lasts 0.125s, scales everything
//to 0, with a delay of 0s, and because all 3 lines were set to start at the very middle of the svg, it will scale to the middle
//instead of scaling to one side, THIS WILL APPLY ALSO WHEN IT REVERSES!
//Then it animates lineOne with a duration of 0.125s, to transform from the very middle of the SVG and it also moves it 8px in the y axis
//because the original svg is set 8 pixels above the second line which is 50 (50-8=42) and so it moves it down 8px to stay in the center
//also adds an ease control with a delay of 0.10 so that it lets the lineTwo get out first and then the others can merge later.
//THE SAME EXACT THING IS APPLIED TO lineThree EXCEPT ITS MOVED -8PX up because is set 8px below the original (50+8=58).
//After this, the entire hamburger is rotated 180degrees, with a duration of 0.5s, and with an ease control to smooth it out.
//Finally, we rotate both lineOne and lineThree by 45degrees first then -45 second, so that both come up to eachother to form an "X"
//with a duration of 0.25s and a label to both lines ("cross") so that they both this animation at the same time. 
//IF YOU DONT DO THAT LAST PART lineOne WILL MOVE FIRST THEN lineThree WILL COME SECOND BECAUSE THIS IS IN CRONOLOGICAL ORDER!! 
toggleMenu
    .to(lineTwo, 0.125, {scaleX: 0}, 0)
    .to(lineOne, 0.125, {transformOrigin: "50% 50%", y: 8, ease: 
    Power2.easeInOut}, 0.10)
    .to(lineThree, 0.125, {transformOrigin: "50% 50%", y: -8, ease: 
    Power2.easeInOut}, 0.10)
    .to(hamburger, 0.5, {rotation: 180, ease: Power4.easeInOut})
    .to(lineOne, 0.25, {rotation: 45, ease: Power2.easeInOut}, "cross")
    .to(lineThree, 0.25, {rotation: -45, ease: Power2.easeInOut}, "cross");

//The "X" Event Listner Animation, this is so that when you click, that block of code up there will execute (the toggleMenu)
//Once you click the hamburger, it gives the hamburger SVG the 'js-x' class so that it doesn't interfere with the hover animation.
//The last line of code is a TERNARY OPERATOR its basically a shorthand if statement, that IF the toggleMenu is reversed,
//it will play the animation that has been made up there, IF NOT the toggleMenu animation will reverse everything...
//In this case, WE DID set the toggleMenu to "reversed: true" up there, so it'll play first then reverse once we click again, hence the else
//that says that IF the animation has been played and we click again, the animation will reverse.
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('js-x');
    toggleMenu.reversed() ? toggleMenu.play() : toggleMenu.reverse();
});    



// YOYO:true makes said animation repeat backwards, if theres a delay between
// the same amount of elements being animated.

// To make only one element move, use this, but if you want to move
// several elements of the same type at the same time, use the one above:
//
// hamburger.addEventListener('pointerenter', () => {
//     tlm
//         .to(lineOne, 1, {scaleX: 1.5})
//         .to(lineOne, 1, {scaleX: 1});
// });
