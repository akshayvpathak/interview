    //array to save line by line 
    let xInputs = [];

    const getInput = async (resolve)=>{
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            readline.on('line',(line)=>{
            readline.close();
            xInputs.push(line);
            resolve(line);
            })
    }

    const getMultiInput = (numberOfInputLines,callback)=>{

        ++numberOfInputLines;
        let i = 0;
        let p = Promise.resolve(); 
        for (; i < numberOfInputLines; i++) {
            p = p.then(_ => new Promise(resolve => getInput(resolve)));
        }
        p.then(()=>{
            callback();
        });
    }

    //get number of lines 
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    readline.on('line',(line)=>{
        getMultiInput(line,()=>{
            printData(xInputs);
        });
        readline.close();
    })

    const printData = (data) => {
        var mainString = data[0];
        console.log(mainString);
        console.log(data.length -1);
        data.map((substring,length)=> {
            if(length>=1){
                if(isSubSequence(mainString,substring,mainString.length, substring.length)){
                    console.log('POSITIVE')
                }
                else{
                    console.log('NEGATIVE');
                };
            }
        })

    }

    function isSubSequence(str1, str2, m, n)
{
     
    // Base Cases
    if (m == 0)
        return true;
    if (n == 0)
        return false;
          
    // If last characters of two strings
    // are matching
    if (str1[m - 1] == str2[n - 1])
        return isSubSequence(str1, str2,
                             m - 1, n - 1);
 
    // If last characters are not matching
    return isSubSequence(str1, str2, m, n - 1);
}