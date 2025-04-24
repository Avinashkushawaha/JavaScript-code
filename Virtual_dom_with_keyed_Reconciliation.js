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

    