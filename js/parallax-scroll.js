var Parallax = function(){
    
    var attr = {
        wrapper: null,
        amount: 0
    };

    var method = {
        
        /**
         * Return the amount of parallax boxes
         * 
         * @return integer
         */
        getAmount: function() {
            if (!attr.amount) {
                attr.amount = document.getElementById(attr.wrapper).querySelectorAll('.parallax').length - 1;
            }
            return attr.amount;
        },
        
        /**
         * Process the configurations
         * 
         * @param array  config
         * @param string config.wrapper {ID of the element that wrapper the parallax boxes}
         */
        processConfig: function(config) {
            if (config.wrapper != undefined) {
                attr.wrapper = config.wrapper;
            }
        },
        
        /**
         * Create the bullet controls in the left side
         */
        createBulletControl: function() {
            document.getElementById(attr.wrapper).innerHTML += '<div id="control-parallax"></div>';
            var amount  = method.getAmount();
            var control = document.getElementById('control-parallax');
            for (var z=0; z<=amount; z++) {
                control.innerHTML += '<a href="#"' + (z==0 ? ' class="current"' : '') + '></a>';
            }
        },
        
        /**
         * Create the touch controls
         */
        createTouchControl: function() {
            var parent = document.getElementById(attr.wrapper);
            parent.innerHTML += '<a id="control-parallax-up"></a><a id="control-parallax-down"></a>';
        },
        
        /**
         * Make the event listeners
         */
        createEventListeners: function(){
            var bullets = document.getElementById('control-parallax').querySelectorAll('a');
            for (var i=0; i<bullets.length; i++) {
                bullets[i].addEventListener('click', method.bulletControl);
            }
            
            document.body.addEventListener('keydown', function(e){
                if (e.keyCode == '40' || e.keyCode == '38')
                    if (e.keyCode == '40')
                        public.goDown();
                    else
                        public.goUp();
            });
            
            document.getElementById('control-parallax-up').addEventListener('click', function(e){
                e.preventDefault();
                public.goUp();
            });
            
            document.getElementById('control-parallax-down').addEventListener('click', function(e){
                e.preventDefault();
                public.goDown();
            });
            
            if (window.addEventListener)
                window.addEventListener('DOMMouseScroll', method.mouseWheel, false);
            window.onmousewheel = method.mouseWheel;
        },
        
        /**
         * Make the control by bullets in left side
         */
        bulletControl: function(e){
            e.preventDefault();
            var idx        = method.getIndexBulletControl(e.srcElement);
            var idxCurrent = method.getIndexCurrentParallax();
            if (idxCurrent == idx) {
                return false;
            }
            if (idxCurrent > idx) {
                method.goToParallax('up', idx);
            } else {
                method.goToParallax('down', idx);
            }
        },
        
        /**
         * Make the control by mouse wheel
         * 
         * @param integer delta
         */
        mouseWheelControl: function(delta) {
            if (delta < 0)
                public.goDown();
            else
                public.goUp();
        },
        
        /**
         * Return the index of the bullet control of the specific element
         * 
         * @param Object element
         */
        getIndexBulletControl: function(element){
            var idx;
            var bullets = document.getElementById('control-parallax').querySelectorAll('a');
            for (var i=0; i<bullets.length; i++)
                if (bullets[i] == element)
                    idx = i;
            return idx;
        },
        
        /**
         * Return the bullet control for a specific index
         * 
         * @param integer idx
         * 
         * @return element
         */
        getBulletControlByIndex: function(idx){
            var bullets = document.getElementById('control-parallax').querySelectorAll('a');
            return bullets[idx];
        },
        
        /**
         * Return the index of the current parallax
         */
        getIndexCurrentParallax: function(){
            var current  = document.getElementById(attr.wrapper).querySelectorAll('.fixedCurrent')[0];
            var parallax = document.getElementById(attr.wrapper).querySelectorAll('.parallax');
            for (var i=0; i<parallax.length; i++)
                if (parallax[i] == current)
                    return i;
        },
        
        /**
         * Return the parallax for a specific index
         * 
         * @param integer idx
         * 
         * @return element
         */
        getParallaxByIndex: function(idx){
            var parallax = document.getElementById(attr.wrapper).querySelectorAll('.parallax');
            return parallax[idx];
        },
        
        /**
         * Show the box parallax
         * 
         * @param string  direction
         * @param integer idx
         */
        goToParallax: function(direction, idx) {
            var amount_parallax = method.getAmount();
            var idxOut          = method.getIndexCurrentParallax();
            method.clearCss();
            if (direction == 'down') {
                if (idx > 0) {
                    method.getParallaxByIndex(idxOut).className += ' outFixedDown';
                }
                method.getParallaxByIndex(idx).className += ' inFixedDown';
            } else {
                if (idx < amount_parallax) {
                    method.getParallaxByIndex(idxOut).className += ' outFixedUp';
                }
                method.getParallaxByIndex(idx).className += ' inFixedUp';
            }
            method.getParallaxByIndex(idx).className += ' fixedCurrent';
            method.getBulletControlByIndex(idx).className += ' current';
        },
        
        /**
         * Clear the css class
         */
        clearCss: function() {
            var bullets = document.getElementById('control-parallax').querySelectorAll('a');
            for (var i=0; i<bullets.length; i++)
                bullets[i] = method.removeCssClass(bullets[i], 'current');
            
            var cssClass = ['fixedCurrent', 'inFixedDown', 'outFixedDown', 'inFixedUp', 'outFixedUp'];
            var parallax = document.getElementById(attr.wrapper).querySelectorAll('.parallax');
            for (var i=0; i<parallax.length; i++)
                for (var x=0; x<cssClass.length; x++)
                    parallax[i] = method.removeCssClass(parallax[i], cssClass[x]);
        },
        
        /**
         * Clear the css class
         * 
         * @param Object element
         * @param string cssClass
         * 
         * @return Object
         */
        removeCssClass: function(element, cssClass) {
            var reg = new RegExp('(^|\\s)' + cssClass + '($|\\s)', 'g');
            element.className = element.className.replace(reg, ' ');
            return element;
        },
        
        /**
         * Control the events the mouse wheel
         * 
         * @param Object event
         */
        mouseWheel: function(event) {
            var delta=0;
            if (!event)
                event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta/120;
                if(window.opera)
                    delta = -delta;
            } else if (event.detail) {
                delta = -event.detail/3;
            }
            if (delta)
                method.mouseWheelControl(delta);
            if (event.preventDefault)
                event.preventDefault();
            event.returnValue = false;
        }
        
    };

    var public = {
        
        /**
         * Initialize the object
         * 
         * @param array  config
         * @param string config.wrapper {ID of the element that wrapper the parallax boxes}
         */
        init: function(config) {
            method.processConfig(config);
            document.body.style.overflow = 'hidden';
            var parallax = document.getElementById(attr.wrapper).querySelectorAll('.parallax')[0].className += ' fixedCurrent';
            method.createBulletControl();
            method.createTouchControl();
            method.createEventListeners();
        },
        
        /**
         * Go to the parallax down
         */
        goDown: function() {
            var idx = method.getIndexCurrentParallax() + 1;
            if (idx >= 0 && idx <= method.getAmount()) {
                method.goToParallax('down', idx);
            }
        },
        
        /**
         * Go to the parallax up
         */
        goUp: function() {
            var idx = method.getIndexCurrentParallax() - 1;
            if (idx >= 0) {
                method.goToParallax('up', idx);
            }
        }
        
    };

    return public;
}
