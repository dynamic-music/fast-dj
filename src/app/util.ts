/**
 * Creates GUID for user based on several different browser variables
 * It will never be RFC4122 compliant but it is robust
 */
export function getUserGuid(): string {
    const nav = window.navigator;
    const screen = window.screen;
    let guid: string = nav.mimeTypes.length.toString();
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    return guid;
};