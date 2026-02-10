import { getGlobal } from '@/utils/getGlobalUtils';

class DrawerStyleManager {
    private _count: number = 0;

    private _originalOverflow: string = '';

    public lock(): void {
        if (!getGlobal().document) return;

        this._count++;

        if (this._count === 1) {
            const bodyStyle = getGlobal().document.body.style;
            this._originalOverflow = bodyStyle.getPropertyValue('overflow');
            bodyStyle.setProperty('overflow', 'hidden', 'important');
        }
    }

    public unlock(): void {
        if (!getGlobal().document) return;

        this._count = Math.max(0, this._count - 1);

        if (this._count === 0) {
            const bodyStyle = getGlobal().document.body.style;
            bodyStyle.setProperty('overflow', this._originalOverflow);
        }
    }
}

export const drawerStyleManager = new DrawerStyleManager();
