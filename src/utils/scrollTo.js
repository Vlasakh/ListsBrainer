import isString from './isString';
import isObject from './isObject';
import animation from './animation';

var animateId;

const config = {
        spacing: {
            top: 140, // TODO ну пока так отбиваемся от баннера
        },
    },
    SCROLL_BOTTOM_OFFSET = 20,
    animationAvailable = () => typeof requestAnimationFrame !== 'undefined';

const SCROLL_DURATION = 300;

class ScrollTo {
    getToByTarget({ target, from, layout }) {
        let to;
        let rect;
        let layoutRect;

        switch (target) {
            case '$top':
                to = 0;
                break;
            case '$bottom':
                to = document.height || document.documentElement.clientHeight;
                break;
            default:
                rect = target && target.getBoundingClientRect && target.getBoundingClientRect();
                layoutRect = layout && layout.getBoundingClientRect();
                to = (rect ? from + rect.top : 0) - (layoutRect ? layoutRect.top : 0);
        }

        return to;
    }

    getHashTarget(selector) {
        try {
            return document.querySelector(selector);
        } catch (e) {
            return undefined;
        }
    }

    horizontalScrollTo(options) {
        const opts = Object.assign(
                {
                    target: options.target || '$left',
                },
                options
            ),
            target = opts.hashTarget || opts.target,
            to = target === '$left' ? 0 : target.offsetLeft;

        let setScrollLeft = val => {};

        if (opts.layout) {
            setScrollLeft = val => {
                opts.layout.scrollLeft = val;
            };
        }

        setScrollLeft(to);
    }

    verticalScrollTo(options) {
        // eslint-disable-line complexity
        const html = window.document.documentElement,
            body = window.document.body,
            opts = Object.assign(
                {
                    animate: true,
                    duration: SCROLL_DURATION,
                    target: options.target || '$top',
                    hash: '',
                    extraHeight: 0,
                    skipIfMaxScroll: false,
                },
                options
            ),
            target = opts.hashTarget || opts.target;
        let setScrollTop = val => {
                body.scrollTop = val;
                html.scrollTop = val;
            },
            from = body.scrollTop || html.scrollTop,
            to,
            skipAnimate = false;

        if (opts.layout) {
            setScrollTop = val => {
                opts.layout.scrollTop = val;
            };
            from = opts.layout.scrollTop;
        }

        to = this.getToByTarget({ target, from, layout: opts.layout }) || options.to || 0;

        animateId && animation.cancel(animateId);

        to -= opts.extraHeight;

        if (opts.skipIfMaxScroll) {
            const scrollHeight = body.scrollHeight || html.scrollHeight;

            skipAnimate = scrollHeight - window.innerHeight <= from;
        }

        if (opts.animate && animationAvailable() && !skipAnimate) {
            animateId = animation({
                duration: opts.duration,
                transition: 'circOut',
                step: delta => {
                    var result = (to - from - opts.excludeHeight) * delta + from;

                    options.callback && options.callback();

                    setScrollTop(result);
                },
                complete: opts.complete,
            });
        } else {
            setScrollTop(to);
            options.complete && options.complete();
        }
    }

    scrollTo(options = {}) {
        const document = window.document,
            opts = Object.assign(
                {},
                {
                    hash: '',
                    excludeHeight: 0, // для случаев наподобие sticky header (задаем высоту хедера, чтобы не перекрывал)
                },
                options
            ),
            hashTarget = this.getHashTarget(opts.hash);

        let layout;

        if (isObject(opts.scrollContainer) && opts.scrollContainer.nodeType === 1) {
            layout = opts.scrollContainer;
        } else {
            layout = isString(opts.scrollContainer) ? document.querySelector(opts.scrollContainer) : null;
        }

        if (!options.horizontal) {
            this.verticalScrollTo({ ...opts, layout, hashTarget });
        } else {
            this.horizontalScrollTo({ ...opts, layout, hashTarget });
        }
    }

    /*
     * if target is lower than viewport, calculate offset from top
     */
    getScrollBottomOffset(targetBoundingRect, windowObj = window || {}) {
        const { bottom, height } = targetBoundingRect,
            shouldScrollToBottom = windowObj.innerHeight < bottom + SCROLL_BOTTOM_OFFSET;

        return shouldScrollToBottom ? windowObj.innerHeight - height - SCROLL_BOTTOM_OFFSET : null;
    }

    /*
     * if target is higher than viewport, calculate offset from top
     */
    getScrollTopOffset(targetBoundingRect, extraHeight) {
        const { top } = targetBoundingRect,
            shouldScrollToTop = top < extraHeight;

        return shouldScrollToTop ? extraHeight : null;
    }

    scrollIfHidden(target, scrollTopSpace) {
        // Не скроллить если элемент скрыт (display: none)
        if (target.offsetParent === null) {
            return;
        }

        const targetBoundingRect = target.getBoundingClientRect(),
            extraHeight = !isNaN(+scrollTopSpace) ? +scrollTopSpace : config.spacing.top,
            scrollToBottomOffset = this.getScrollBottomOffset(targetBoundingRect),
            scrollToTopOffset = this.getScrollTopOffset(targetBoundingRect, extraHeight),
            scrollOffset = scrollToBottomOffset || scrollToTopOffset;

        if (scrollOffset) {
            this.scrollTo({
                target,
                extraHeight: scrollOffset,
            });
        }
    }
}

export default ScrollTo;
