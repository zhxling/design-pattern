~(function() {
    var window = this || (0, eval)('this');

    var FONTSIZE = function() {
        // IE currentStyle
        // firefox/chrome window.getComputedStyle("元素", "伪类");
       return parseInt(document.body.currentStyle ? document.body.currentStyle['fontSize'] :
                       window.getComputedStyle(document.body, false)['font-size'], 10)
    }();

    //
    var VM = function() {
        var Method = {
            /***
            *
            * dom
            * data
            **/
            progressbar: function(dom, data) {
                var progress = document.createElement('div'),
                    param = data.data;
                dom.className += ' ui-progressbar';

                progress.style.width = (param.position || 100) + '%';

                dom.appendChild(progress);

            },
            slider: function(dom, data) {
                console.log(data);
                var bar = document.createElement('span'),
                    progress = document.createElement('div');
                dom.className += ' ui-slider';

                var    totleText = null,
                    progressText = null,
                    param = data.data,
                    width = dom.offsetWidth,
                    left = dom.offsetLeft,
                    realWidth = (param.position || 100) * (width / 100);
                dom.innerHTML = '';
                console.log(width);

                if(param.totle) {
                    var text = document.createElement('b');
                    progressText = document.createElement('em');
                    text.innerHTML = param.totle;
                    dom.appendChild(text);
                    dom.appendChild(progressText);
                }
                setStyle(realWidth);
                dom.appendChild(bar);
                dom.appendChild(progress);

                function setStyle(w) {
                    progress.style.width = w + 'px';
                    bar.style.left = w - FONTSIZE / 2 + 'px';
                    if(progressText) {
                        progressText.style.left = w - FONTSIZE / 2 * 2.4 + 'px';
                        progressText.innerHTML = parseFloat(w / width * 100).toFixed(2) + '%';
                    }
                }

                bar.onmousedown = function() {
                    document.onmousemove = function(event) {
                        var e = event || window.event;

                        var w = e.clientX - left;
                        setStyle(w < width ? (w > 0 ? w : 0) : width);
                    }

                    document.onselectstart = function() {
                        return false;
                    }
                }

                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onselectstart = null;
                }
            }
        }

        function getBindData(dom) {
            var data = dom.getAttribute('data-bind');
            return !!data && (new Function ("return ({" + data + "})"))()
        }

        return function() {
            var doms = document.body.getElementsByTagName('*'),
                ctx =null;

            for(var i =0; i<doms.length; i++) {
                ctx = getBindData(doms[i]);
                ctx.type && Method[ctx.type] && Method[ctx.type](doms[i], ctx);
            }
        }
    }();
    window.VM = VM;
})()