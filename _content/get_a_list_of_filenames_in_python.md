---
title: 'How to get a list of filenames in nested directories in python'
slug: 'list_of_filenames_python'
date: '2021-07-10T20:44:05.872Z'
---

With the help of two modules from [Python's standard library](https://docs.python.org/3/library/) we will build few functions that can walk a directory and yield a list of files that match your criteria. We will use [the os module](https://docs.python.org/3/library/os.html) and [the glob module.](https://docs.python.org/3/library/glob.html) You can for example walk a every directory within a directory and every path to a `.json` file will be appended to the list. 

### Walk directories and yield all json files

```python
import os
import glob

def get_json_file_paths(path: str, filename: str = '*.json') -> str:
    """Walk path and yield all file paths that match the filename.

    Args:
        path (str):
            The function will start from this directory and walk 
            all nested directories.

        filename (str, optional):
            Whenever a file matches this string, the function will yield
            the absolute path to this file. Defaults to "*.json" which
            will yield all files that have the .json extension. 

    Yields:
        A string that is the absolute path to the file that was found.

    https://docs.python.org/3/library/os.html#os.walk
    https://docs.python.org/3/library/glob.html#glob.glob
    """
    for dirpath, dirnames, filenames in os.walk(path):
        files_paths = glob.glob(os.path.join(dirpath, '*.json'))
        for file_path in file_paths:
            yield os.path.abspath(file_path)


paths_to_json_files = get_json_file_paths('~/projects/analyse_economic_data/data')
```