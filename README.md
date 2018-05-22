# localgit
A CLI application to commit changes from a local folder to another 

```Python console
npm i -g localgit
```

## Steps
1. Link your current folder to the one you want to push changes
    ```Python console
    C:\Users\Example\Projects-Development\foo> localgit link "C:\Users\Example\Projects-Production\foo"
    ```
    Now I can push changes from `C:\Users\Example\Projects-Development\foo` to `C:\Users\Example\Projects-Production\foo`
    Obs. Do not forget the quotation marks outside the directory path.

3. (Optional) Create a .glignore file in the main folder and write the name of the files you want to ignore from pushing separated by line break. (same as git, but no multiple .gliginore files are allowed)

2. Push changes! :D
    ```Python console
    localgit push
    ```
