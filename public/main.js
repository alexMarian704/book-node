let t1 = gsap.timeline({defaults:{duration:1}})

gsap.from('#slide' , {y:"0%" , duration:0.7 ,delay:0.5})
gsap.from("#navId" , {opacity:0 , duration:1.4 , delay:1.3})
gsap.from(".book" , {opacity:0 , duration:1.3 , delay:1.1})

// t1.from('#slide' , {y:"0%" , duration:1.2 , delay:0.5})
