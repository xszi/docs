export default {
    methods: {
        clipboard (text) {
            if (window.clipboardData && window.clipboardData.setData) {
                return window.clipboardData.setData('Text', text);
            } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
                const textarea = document.createElement('textarea');
                textarea.textContent = text;
                textarea.style.position = 'fixed';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    return document.execCommand('copy');
                } catch (e) {
                    return false;
                } finally {
                    document.body.removeChild(textarea);
                }
            }
        }
    }
}