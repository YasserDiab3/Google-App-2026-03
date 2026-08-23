import os
import shutil

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
            shutil.rmtree(dest)

        # Copy entire directory
        shutil.copytree(src, dest)
        print(f"Successfully synced {src_rel}.")

    # Copy root vercel.json and deployment artifacts
    if os.path.exists(os.path.join(base_dir, 'vercel.json')):
        shutil.copyfile(os.path.join(base_dir, 'vercel.json'), os.path.join(deploy_dir, 'vercel.json'))
        print("Successfully synced vercel.json.")

    pub_src = os.path.join(base_dir, 'Frontend', 'public-observation.html')
    if os.path.exists(pub_src):
        for target in [
            os.path.join(deploy_dir, 'public-observation.html'),
            os.path.join(deploy_dir, 'dist', 'public-observation.html'),
            os.path.join(deploy_dir, 'frontend', 'public-observation.html'),
            os.path.join(deploy_dir, 'frontend', 'dist', 'public-observation.html'),
            os.path.join(base_dir, 'dist', 'public-observation.html')
        ]:
            os.makedirs(os.path.dirname(target), exist_ok=True)
            shutil.copyfile(pub_src, target)
        print("Successfully synced public-observation.html across all deploy targets.")

if __name__ == "__main__":
    sync_directories()
