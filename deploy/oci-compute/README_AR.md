# مسار API على OCI Compute (ربط مباشر Oracle)

الهدف: **واجهة على Vercel** + **API دائم على VM في OCI** يتصل بـ Autonomous DB مباشرة (`DB_TYPE=oracle`).

Vercel Serverless فشل سابقاً (504). هذا المسار هو الحل.

## المعمارية

```
المتصفح → www.safety-icapp.com (Vercel UI)
                ↓  /api/exec  /api/health
         OCI_API_UPSTREAM (proxy رقيق)
                ↓
         OCI Compute VM (Docker: Express + oracledb)
                ↓  Wallet + IP ثابت
         Oracle Autonomous DB
```

## 0) عائق حالي: OCI API Profile

MCP `user-oracle-oci-cloud` مربوط لكن يستدعي: `Unable to load the selected OCI profile`.

لازم أحد الخيارين قبل إنشاء الـ VM من هنا:

### أ) ملف محلي `~/.oci/config` (موصى)

1. OCI Console → Profile → API Keys → Add API Key → Download private key
2. أنشئ `C:\Users\YasserMohamed\.oci\config`:

```ini
[DEFAULT]
user=ocid1.user.oc1..xxxx
fingerprint=xx:xx:...
tenancy=ocid1.tenancy.oc1..xxxx
region=me-jeddah-1
key_file=C:\Users\YasserMohamed\.oci\oci_api_key.pem
```

3. أعد مصادقة MCP Oracle OCI في Cursor

### ب) إنشاء VM يدوياً من Console (فوري)

اتبع القسم 1 أدناه بدون MCP.

---

## 1) إنشاء Compute من Console

1. **Compute → Instances → Create**
2. الاسم: `hse-sql-api`
3. Image: **Oracle Linux 8** أو **Ubuntu 22.04**
4. Shape: **VM.Standard.A1.Flex** (Always Free إن متاح) — 1 OCPU / 6 GB كحد أدنى
5. شبكة: Public subnet + **Assign public IPv4**
6. SSH key: أضف مفتاحك العام
7. Advanced → Cloud-init: الصق محتوى `deploy/oci-compute/cloud-init.yaml`
8. بعد الإنشاء: سجّل **Public IP**
9. **Networking → Security List / NSG**: افتح inbound:
   - TCP 22 (SSH من IPك فقط إن أمكن)
   - TCP 80 / 443 (عام أو Cloudflare)

## 2) وصول ADB من الـ VM

في Autonomous Database → Network:

- إمّا **Secure access from everywhere** (أسهل للتجربة)
- أو أضف **Public IP** الخاص بالـ VM إلى Access Control List

بدون هذا: اتصال Oracle يعلّق مثل ما حصل على Vercel.

## 3) نشر API على الـ VM

من جهازك (بعد SSH):

```bash
# على الـ VM
sudo mkdir -p /opt/hse/{app,wallet}
# انسخ المستودع (git clone أو scp)
# انسخ Wallet إلى /opt/hse/wallet  (ملفات ewallet.pem / tnsnames.ora / sqlnet.ora …)

cd /opt/hse/app/deploy/oci-compute
cp .env.example .env
# حرّر .env: ORACLE_USER / ORACLE_PASSWORD / ORACLE_CONNECT_STRING / ORACLE_WALLET_PASSWORD

chmod +x bootstrap-vm.sh
sudo bash bootstrap-vm.sh /opt/hse/app /opt/hse/wallet
```

تحقق محلي على الـ VM:

```bash
curl -s http://127.0.0.1:3001/health
# يجب: "dbType":"oracle" و "dbEngine":"oracle" و "persistent":true

curl -s http://PUBLIC_IP/health
```

## 4) توجيه الواجهة (قطع بدون تغيير كبير في JS)

على مشروع Vercel `safety.icapp` أضف سر Production:

```
OCI_API_UPSTREAM=http://PUBLIC_IP
```

لاحقاً مع TLS:

```
OCI_API_UPSTREAM=https://api.safety-icapp.com
```

ثم أعد نشر الواجهة. `/api/exec` و `/api/health` يصبحان proxy → OCI.

فحص:

```
https://www.safety-icapp.com/api/health
# vercelProxy:true + dbEngine من Oracle
```

إلغاء فوري: احذف `OCI_API_UPSTREAM` من Vercel وأعد النشر → يرجع SQLite المحلي.

## 5) ملفات الحزمة

| ملف | دور |
|-----|-----|
| `deploy/oci-compute/Dockerfile` | صورة Node + oracledb |
| `docker-compose.yml` | API + nginx |
| `nginx.conf` | `/exec` `/health` |
| `cloud-init.yaml` | تثبيت Docker عند إنشاء الـ VM |
| `.env.example` | أسرار Oracle |
| `bootstrap-vm.sh` | بناء وتشغيل |
| `Frontend/api/_oci-proxy.js` | proxy Vercel → OCI |

## 6) قائمة تحقق

- [ ] VM يعمل + Public IP
- [ ] ACL ADB يسمح بـ IP الـ VM
- [ ] `/health` على الـ VM يقول `oracle`
- [ ] دخول + قراءة PTW عبر `http://PUBLIC_IP/exec`
- [ ] `OCI_API_UPSTREAM` على Vercel + نشر
- [ ] `www.safety-icapp.com/api/health` → proxy + oracle
- [ ] (اختياري) DNS `api.safety-icapp.com` + TLS
