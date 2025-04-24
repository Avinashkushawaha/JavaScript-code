class VDOM {
    constructor(root) {
        this.root = root;
        this.currentVDOM = null;
    }

    render(vnode) {
        if (!this.currentVDOM){
            this._mount(this.root, vnode);
        } else {
            this._path(this.root, this.currentVDOM, vnode);
        }

        this.currentVDOM = this._clone(vnode);
    }

    _mount(parent, vnode) {
        const el = this._createElement(vnode);
        parent.appendChild(el);
       
    }

    _patch(parent, oldVNode, newVNode, index = 0) {
        const currentE1 = parent.childNodes[index];

        if (!oldVNode && newVNode) {
            this._mount(parent, newVNode);
            return;
        } 
        if (oldVNode && !newVNode) {
            parent.removeChild(currentE1);
            return;
        }

        if (this._nodesDiffer(oldVNode, newVNode)) {
            parent.replaceChild(this._createElement(newVNode), currentE1);
            return;
        }

        this._updateElement(currentE1, oldVNode, newVNode);

        const oldChildren = this._keyedChildren(oldVNode.children || []);
        const newChildren = this._keyedChildren(newVNode.children || []);
        const moves = this._calculateMoves(oldChildren, newChildren);

        const childNodes = Array.from(currentE1.childNodes);
        const temp = document.createDocumentFragment();

        moves.forEach(({ from, to, key }) => {
            if (from === null){
                const newNode = this._createElement(newChildren[key]);
                temp.appendChild(newNode);
            } else if (to === null) {

                currentE1.removeChild(childNodes[from]);

            } else {
                const node = childNodes[from];
                currentE1.removeChild(node);
                temp.appendChild(node);
            }
        });
        currentE1.appendChild(temp);
}

    _keyedChildren(children) {
        const map = {};
        children.forEach((child, index) => {
            if (child.key) {
                map[child.key] = { child, index };
            } else {
                map[index] = { child, index };
            }
        });
        return map; 
    }

    _calculateMoves(oldChildren, newChildren) {
        const moves = [];
        const usedKeys = new Set();

        Object.entries(oldChildren).forEach(([key, oldChild]) => {
            if (newChildren[key]) {
                usedKeys.add(key);
            } else {
                moves.push({ from: oldChild.index, to: null, key });
            }
        });
      
        Object.entries(newChildren).forEach(([key, newChild]) => {
            if (!usedKeys.has(key)) {
                moves.push({ from: null, to: newChild.index, key });
            }
        });
        return moves;
    }
    _nodesDifferent(a, b) {
        return a.tag !== b.tag || a.key !== b.key;
    }

    _updateElement(el, oldVNode, newVNode) {
        this._updateAttributes(el, oldVNode.attrs, newVNode.attrs);

        if (newVNode.text !== oldVNode.text) {
            el.textContent = newVNode.text;
        }
        
    }

    _updateAttributes(el, oldAttrs = {}, newAttrs = {}) {
       for (const key in oldAttrs) {
        if (!(key in newAttrs)) {
            el.removeAttribute(key);
        }
       }

       for (const key in newAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            el.setAttribute(key, newAttrs[key]);
        }
       }
    }

    _createElement(vnode) {
        if (typeof vnode === 'string') {
            return document.createTextNode(vnode);
        }

        const el = document.createElement(vnode.tag);
       
        for (const [key, value] of Object.entries(vnode.attrs || {})) {
            el.setAttribute(key, value);
        }
        if (vnode.text) {
            el.textContent = vnode.text;
        }

        for (const child of vnode.children || []) {
            el.appendChild(this._createElement(child));
        }
        return el;
    }

    _clone(vnode) {
        if (typeof vnode === 'string') return vnode;

       return {
             tag: vnode.tag,
                key: vnode.key,
                text: vnode.text,
                attrs: { ...vnode.attrs },
                children: (vnode.children || []).map(child => this._cloneVNode(child))
       };
    }
}


const vdom = new VDOM(document.getElementById('app'));

const vnode1 = {
    tag: 'ul',
    children:[
        { tag: 'li', key: 'a', text: 'Item 1' },
        { tag: 'li', key: 'b', text: 'Item 2' },
        { tag: 'li', key: 'c', text: 'Item 3' }
    ]    
};

vdom.render(vnode1);

const vnode2 = {
    tag: 'ul',
    children:[
        { tag: 'li', key: 'b', text: 'Item 2' },
        { tag: 'li', key: 'a', text: 'Item 1' },
        { tag: 'li', key: 'd', text: 'Item 4' }
    ]    
};
vdom.render(vnode2);

       