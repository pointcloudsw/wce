/*global console:writable, doc:writable, document:writable, el:writable*/
/*eslint no-undef: "error"*/
/*eslint no-global-assign: "error"*/

doc = ''; el = ''; document.querySelectorAll('article.article-text *').forEach( h => {
    el = h.parentNode.nodeName + ' ' + h.tagName;

    doc += el + h.textContent + '\n';

}); console.log(doc);

