// NOTE: This module will be deleted in favor of
// https://github.com/dojo/framework/pull/264
import Base from '@dojo/framework/widget-core/meta/Base';
export class InputValidity extends Base {
    get(key, value) {
        const node = this.getNode(key);
        if (!node) {
            return { valid: undefined, message: '' };
        }
        if (value !== node.value) {
            // if the vdom is out of sync with the real dom our
            // validation check will be one render behind.
            // Call invalidate on the next loop.
            setTimeout(() => this.invalidate());
        }
        return {
            valid: node.validity.valid,
            message: node.validationMessage
        };
    }
}
export default InputValidity;

/*# sourceMappingURL=InputValidity.mjs.map*/