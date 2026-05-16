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

if __name__ == "__main__":
    sync_directories()
