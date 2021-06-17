
#color preset
DEF=`tput sgr0`
GRN=`tput setaf 2`
BD=`tput bold`

echo ""
echo "${GRN}====================================================================="
echo "${DEF}${BD} #1. React Build "
echo "${GRN}====================================================================="
echo "${DEF}"

cd client
if [ ! -d "node_modules" ]
then
    echo "${GRN}====================================================================="
    echo "${DEF}${BD} #1-1. Install node modules for React  "
    echo "${GRN}====================================================================="
    echo "${DEF}"
    #npm install
    yarn
fi
yarn build

echo ""
echo "${GRN}====================================================================="
echo "${DEF}${BD} #2. Node server start "
echo "${GRN}====================================================================="
echo "${DEF}"
cd ..
if [ ! -d "node_modules" ]
then
    echo "${GRN}====================================================================="
    echo "${DEF}${BD} #2-1. Install node modules for Node "
    echo "${GRN}====================================================================="
    echo "${DEF}"
    #npm install
    yarn
fi

yarn start
