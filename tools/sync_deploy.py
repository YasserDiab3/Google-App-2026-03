import os
import shutil

def safe_copy(src, dst):
    try:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(src, dst)
    except Exception as e:
        pass

def sync_directories():
    # Base directory of the repository
    base_dir = os.getcwd()
    deploy_dir = os.path.join(base_dir, 'vercel-deploy')

    # Define mapping: source relative path -> destination full path
    mapping = {
        'Backend': os.path.join(deploy_dir, 'backend'),
        'Frontend': os.path.join(deploy_dir, 'frontend')
    }

    # Ensure vercel-deploy directory exists
    if not os.path.exists(deploy_dir):
        os.makedirs(deploy_dir)
        print(f"Created {deploy_dir}")

    for src_rel, dest in mapping.items():
        src = os.path.join(base_dir, src_rel)
        if not os.path.exists(src):
            print(f"Source {src} does not exist. Skipping.")
            continue

        print(f"Syncing {src_rel} to {dest}...")

        # Clean destination
        if os.path.exists(dest):
            try:
                shutil.rmtree(dest)
            except Exception:
                pass

        # Copy entire directory
        try:
            shutil.copytree(src, dest, dirs_exist_ok=True)
            print(f"Successfully synced {src_rel}.")
        except Exception as e:
            print(f"Notice during {src_rel} sync: {e}")

    # Copy root vercel.json and deployment artifacts
    if os.path.exists(os.path.join(base_dir, 'vercel.json')):
        safe_copy(os.path.join(base_dir, 'vercel.json'), os.path.join(deploy_dir, 'vercel.json'))
        print("Successfully synced vercel.json.")

    public_files = [
        'forms-hub.html',
        'public-observation.html',
        'public-near-miss.html',
        'public-fire-inspection.html',
        'public-daily-safety.html',
        'gate-visitor-entry.html',
        'manifest-hub.json',
        'manifest-observation.json',
        'manifest-near-miss.json',
        'manifest-fire-inspection.json',
        'manifest-daily-safety.json',
        'manifest-visitor.json'
    ]
    for pfile in public_files:
        pub_src = os.path.join(base_dir, 'Frontend', pfile)
        if os.path.exists(pub_src):
            for target in [
                os.path.join(deploy_dir, pfile),
                os.path.join(deploy_dir, 'dist', pfile),
                os.path.join(deploy_dir, 'frontend', pfile),
                os.path.join(deploy_dir, 'frontend', 'dist', pfile),
                os.path.join(base_dir, 'dist', pfile)
            ]:
                safe_copy(pub_src, target)
            print(f"Successfully synced {pfile} across all deploy targets.")

if __name__ == "__main__":
    sync_directories()
