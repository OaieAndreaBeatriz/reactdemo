## facem branch nou

git checkout -b <branch_name>

## dupa modifs, salvam

git status
git add .
git commit -m "smtg here"
git push origin <branch_name>
git logs

## la final, facem merge in branch-ul principal

git checkout main
git merge --no-ff <branch_name> / de preferaat direct din interfata de github.com
git fetch
git pull

## dam taguri :)

git tag 1.4.3
git push origin --tags
git tag -d 1.4.3 # stergem tag-ul local
git push origin --delete 1.4.3 # stergem tag-ul remote

## curatam branch-ul care nu ne mai trebuie

git branch -d <branch_name>
git push origin --delete <branch_name>
