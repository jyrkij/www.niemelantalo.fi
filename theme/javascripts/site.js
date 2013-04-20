var Carousel = function (element, options) {
    this.element = element
    this.options = options
}

Carousel.prototype = {
    cycle: function(e) {
        if (!e) this.paused = false
        if (this.interval) clearInterval(this.interval)
        this.options.interval
            && !this.paused
            && (this.interval = setInterval(this.next.bind(this), this.options.interval))
        return this
    },

    pause: function(e) {
        if (!e) this.paused = true
        clearInterval(this.interval)
        this.interval = null
        return this
    },

    next: function() {
        if (this.sliding) return
        return this.slide('next')
    },

    prev: function() {
        if (this.sliding) return
        return this.slide('prev')
    },

    slide: function (type) {
        var active = this.element.querySelector('.active'),
            next = ( type == 'next' ) ?
                active.nextElementSibling :
                active.previousElementSibling,
            isCycling = this.interval,
            direction = ( type == 'next' ) ? 'left' : 'right',
            fallback = ( type == 'next' ) ?
                this.element.querySelector('.item:first-child') :
                this.element.querySelector('.item:last-child'),
            that = this

        this.sliding = true

        isCycling && this.pause()

        next = next ? next : fallback

        if (next.className.indexOf('active') > 0) return

        next.className += ' ' + type
        next.offsetWidth // force reflow
        active.className += ' ' + direction
        next.className += ' ' + direction

        var endEventListener = function(e) {
            var regexp = new RegExp(direction + "|" + type, "g")
            next.className = next.className.replace(regexp, '').trim() + ' active'
            regexp = new RegExp(direction + "|active", "g")
            active.className = active.className.replace(regexp, '').trim()
            that.sliding = false
        }

        this.element.addEventListener('transitionend', endEventListener, true)
        this.element.addEventListener('webkitTransitionEnd', endEventListener, true)

        isCycling && this.cycle()

        return this
    }
}

var headerImageCarousel = new Carousel(document.querySelector('.carousel'), { interval: 4000 })
headerImageCarousel.cycle()
