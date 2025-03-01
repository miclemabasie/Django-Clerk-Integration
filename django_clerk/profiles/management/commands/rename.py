import os
import re
from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    help = "Renames the Django project to a new name"

    def add_arguments(self, parser):
        parser.add_argument(
            "new_project_name", type=str, help="The new name for the Django project"
        )

    def handle(self, *args, **kwargs):
        new_project_name = kwargs["new_project_name"]

        # Validate the new project name
        if not re.match(r"^[a-zA-Z_][a-zA-Z0-9_]*$", new_project_name):
            self.stderr.write(
                self.style.ERROR(
                    "Invalid project name. Use only letters, numbers, and underscores."
                )
            )
            return

        # Get the base directory of the project
        base_dir = settings.BASE_DIR
        old_project_name = os.path.basename(base_dir)

        # Files and directories to rename
        files_to_rename = [
            os.path.join(base_dir, "manage.py"),
            os.path.join(base_dir, f"{old_project_name}/settings.py"),
            os.path.join(base_dir, f"{old_project_name}/wsgi.py"),
            os.path.join(base_dir, f"{old_project_name}/asgi.py"),
        ]

        # Rename the project directory
        new_project_dir = os.path.join(os.path.dirname(base_dir), new_project_name)
        os.rename(base_dir, new_project_dir)
        
        # Update the content of the files
        for file_path in files_to_rename:
            with open(file_path, "r") as file:
                content = file.read()
            content = content.replace(old_project_name, new_project_name)
            with open(file_path, "w") as file:
                file.write(content)

        # Rename the inner project folder
        old_inner_dir = os.path.join(new_project_dir, old_project_name)
        new_inner_dir = os.path.join(new_project_dir, new_project_name)
        os.rename(old_inner_dir, new_inner_dir)

        self.stdout.write(
            self.style.SUCCESS(f"Project renamed to {new_project_name} successfully!")
        )
