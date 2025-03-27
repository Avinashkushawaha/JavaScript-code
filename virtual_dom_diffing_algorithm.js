function diff(oldNode, newNode) {
    if (!oldNode) {
        return { type: 'CREATE', newNode };
    }

    if (!newNode) {
        return { type: 'REMOVE' };
    }

    if (Changed(oldNode, newNode)) {
        return { type: 'REPLACE', node:newNode };
    }

    if (newNode.type) {
        const patches = {
            type: 'UPDATE',
            children: [],
            attrs: diffAttributes(oldNode.props, newNode.props)
        };

        const oldChildren = oldNode.children || [];
        const newChildren = newNode.children || [];
        const maxLen = Math.max(oldChildren.length, newChildren.length);

        for (let i = 0; i < maxLen; i++) {
            patches.children.push(diff(oldChildren[i], newChildren[i]));
        }

        return patches;
    }

    return { type: 'SKIP' };
}

function Changed(node1, node2) {
    return (
        typeof node1 !== typeof node2 ||
        (typeof node1 === 'string' && node1 !== node2) ||
        node1.type !== node2.type
    );
}

function diffAttributes(oldProps = {}, newProps = {}) {
    const patches = [];

    const allProps = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);

   for (const name of allProps){
    if (name === 'children') continue;

    const oldValue = oldProps[name];
    const newValue = newProps[name];

    if (!newValue) {
        patches.push({ type: 'REMOVE_ATTR', name });
    } else if (!oldValue || oldValue !== newValue) {
        patches.push({ type: 'SET_ATTR', name, value: newValue });
    }
   }

    return patches;
}