import os

files = ['Frontend/public-observation.html', 'Frontend/dist/public-observation.html']

closed_card_html = '''
        <!-- 🐖  بطاقة إغلاق استقبال الردود (مثل Google Forms Closed Card) -->
        <div id="formClosedCard" style="display: none; background: #ffffff; border-radius: 18px; padding: 40px 24px; text-align: center; border: 1.5px solid #fee2e2; box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.1); margin-bottom: 24px; max-width: 600px; width: 100%;">
            <div style="width: 72px; height: 72px; background: #fef2f2; border: 2px solid #fecaca; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #dc2626; font-size: 32px; margin-bottom: 18px;">
                <i class="fas fa-lock"></i>
            </div>
            <h2 style="font-size: 1.35rm; font-weight: 800; color: #0f172a; margin-bottom: 10px;">النموذج لا يقبل ردوداً حاليا</h2>
            <p id="formClosedReasonText" style="font-size: 0.92rm; color: #64748b; line-height: 1.7; margin-bottom: 24px; max-width: 480px; margin-inline: auto;">
                لقد تم إيقاف استقبال الملاحظات اليومية م؃قتاً من قѐبل إدارة السلامة والصحة المهنية.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a href="/forms-hub" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 12px; font-weight: 700; font-size: 0.88rm; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(37,99,235,0.25);">
                    <i class="fas fa-layer-group"></i> <span>الرجوع لبوابة النما݋����7�������F�c���F�c�rrp��fW'6����&FvU��F���rrp��F�b6�73�&f��FW"�fW'6����7G&�"7G��S�&F�7���f�W��Ɩv�֗FV�3�6V�FW#��W7F�g��6��FV�C�6V�FW#�v�����&v���F����f��B�6��S��s�&Ӳ6���#�3cCsC�#�#�ƒ6�73�&f2f�6�FR�'&�6�FW�B�&�VR�c#������7��]�]���}��}�M���}��������7���7��C�&�&�fW'6���"7G��S�&f��B�f֖Ǔ�����76S�f��B�vV�v�C���6���#�3S#�6#�&6�w&�V�C�6S&S�c�FF��s�'����&�&FW"�&F�W3�g��#�c��s3��7���'WGF��G�S�&'WGF��"��6Ɩ6��&f�&6T&Vg&W6��WfV�B�"F�F�S�-���݊������}�M���}�����"���]�=���}�M�M�كرة المكقةتى" style="background: #eff6ff; border: 1px solid #bfdbfe; color: #2563eb; border-radius: 6px; padding: 3px 8px; font-size: 0.72rm; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fas fa-rotate" id="refreshIconSpin"></i> <span>⨭دي�</span>
                </button>
            </div>
'''

js_functions = '''
        async function checkFormAcceptanceStatus() {
            if (!navigator.onLine) return;
            try {
                const targetApiUrl = (typeof SCRIPT_URL !== 'undefined' && SCRIPT_URL) ? SCRIPT_URL : (typeof getEffectiveApiUrl === 'function') ? getEffectiveApiUrl() : '';
                const res = await fetch(`d{targetApiUrl}O�[ۏY�]X�Xћܛ\��]\ɗ�I�]K����
_X
NY�
\�\˛��H�]\���ۜ�]HH]�Z]�\˚��ۊ
NY�
]H	��]K��X��\��	��]K��]\�	��]K��]\˛؜�\��][ۊH�ۜ�؜��]\�H]K��]\˛؜�\��][ێY�
؜��]\˚\��[�OOH�[�JH�ۜ��ܛP�\�H��[Y[���][[Y[��RY
	�؜�\��][ۑ�ܛI�N�ۜ����Y�\�H��[Y[���][[Y[��RY
	ٛܛP���Y�\�	�N�ۜ��X\�ە^H��[Y[���][[Y[��RY
	ٛܛP���Y�X\�ە^	�NY�
�ܛP�\�
H�ܛP�\���[K�\�^HH	ۛۙI�Y�
���Y�\�
H���Y�\���[K�\�^HH	؛����Y�
�X\�ە^	��؜��]\˛Y\��Y�JH�X\�ە^�^�۝[�H؜��]\˛Y\��Y�NB�B�H�]�
�H�B�B��\�[���[��[ۈ�ܘ�P\�Y��\�
]�[�
HY�
]�[�
H�]�[���]�[�Y�][

N�]�[������Y�][ۊ
N�B��ۜ�X�ۈH��[Y[���][[Y[��RY
	ܙY��\�X�۔�[��NY�
X�ۊHX�ۋ��\��\��Y
	٘K\�[��N�HY�
	��X�\��[��[���H�ۜ��^\�H]�Z]�X�\˚�^\�
N]�Z]��Z\�K�[
�^\˛X\
O��X�\˙[]J
JJNB�Y�
	��\��X�U�ܚ�\��[��]�Y�]܊H�ۜ��Y�\��][ۜ�H]�Z]�]�Y�]܋��\��X�U�ܚ�\���]�Y�\��][ۜ�
N�܈
�ۜ��و�Y�\��][ۜ�H]�Z]��\]J
NB�B�H�]�
�H�B��[��˛��][ۋ��[�Y
�YJNB�����܈�[W�][��[\΂�Y����˜]�^\���[W�]
N���۝[�YB��]�[��[W�]	܉�[���[��I�]�N	�H\����[H���XY

B��Y�	�YH��ܛP���Y�\�����[�[��[H[��\X�J	��ܛHYH�؜�\��][ۑ�ܛH�����Y��\��[
�	���ܛHYH�؜�\��][ۑ�ܛH��JB��Y�	�YH��\�\��[ۈ����[�[����[��YH[��[�
	�]��\��H����\�X��[���B�Y���[��YOHLN��[��]�H[��[�
	��]�����[��Y
B�[H[Ι[��]�
��H
�	���
��\��[ؘۗY�W�[
�[�[��]�
���B��Y�	��X�ћܛPX��\[��T�]\����[�[��\��]����H��[��˘Y]�[�\�[�\�	��P�۝[��YY	�

HO�Ȃ�[H[��\X�J\��]������ٝ[��[ۜ�
�	��	�
�\��]����
�	���X�ћܛPX��\[��T�]\�
N��JB���]�[��[W�]	���[���[��I�]�N	�H\������ܚ]J[
B��[�
���X��\�ٝ[H\]Y�ٚ[W�]I�B