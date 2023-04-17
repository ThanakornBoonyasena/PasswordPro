const express = require('express');
const router = express.Router()

const nextroute = {
    newbie:"beginner",
    beginner:"amateur",
    amateur:"semi-pro",
    "semi-pro":"professional",
    professional:"professional"
};

function intcheck(passwordsend,num,stop) {
    let passwordint = passwordsend.map((value) => Number(value));
    console.log(passwordint);
    if (stop) {        
        for (let i = 0; i < 8; i++) {
            if (isNaN(passwordint[i])) {
                num = false;
                break;
            } else {
                num = true;
            }
        }
    } else {
        for (let x = 0 ; x < 8 ; x++) {
            if (Number.isNaN(passwordint[x]) == false) {
                num = true;
                break;
            } else {
                num = false;
            }
        }
    }
     console.log(num);
     return num;
};


function lowercasecheck(passwordsend, lower, stop) {
    const symbolRegex = new RegExp(
        '^(?=.*[!@#$%^&*"\\[\\]\\{\\}<>/\\(\\)=\\\\\\-_´+`~\\:;,\\.€\\|])',)
    if (stop){
        for (let i = 0; i < 8; i++) {
            if (passwordsend[i] === passwordsend[i].toUpperCase()) {
                lower = false;
                break;
            } else {
                lower = true;
            }
         }
    } else {
        for (let x = 0 ; x < 8 ; x++) {
            if (!isNaN(passwordsend[x]) || symbolRegex.test(passwordsend[x])) {
                continue; 
            } else if (passwordsend[x] === passwordsend[x].toLowerCase()) {
                console.log(passwordsend[x] + x)
                lower = true;
                break;
            } else {
                lower = false;
            }
         }
    }
     return lower;
}


function uppercasecheck(passwordsend, upper, stop) {
    const symbolRegex = new RegExp(
        '^(?=.*[!@#$%^&*"\\[\\]\\{\\}<>/\\(\\)=\\\\\\-_´+`~\\:;,\\.€\\|])',)
    if (stop){
        for (let i = 0; i < 8; i++) {
            if (passwordsend[i] === passwordsend[i].toLowerCase()) {
                upper = false;
                break;
            } else {
                upper = true;
            }
         }
    } else {
        for (let x = 0; x < 8; x++) {
            if (!isNaN(passwordsend[x]) || symbolRegex.test(passwordsend[x])) {
                continue; 
            } else if (passwordsend[x] === passwordsend[x].toUpperCase()) {
                console.log(passwordsend[x] + x);
                upper = true;
                break;
            } else {
                upper = false;
            }
        }
    }
    return upper;
}

function symbolcheck(passwordsend,sym) {
    const symbolRegex = new RegExp(
        '^(?=.*[!@#$%^&*"\\[\\]\\{\\}<>/\\(\\)=\\\\\\-_´+`~\\:;,\\.€\\|])',);
    for (let i = 0; i < 8 ; i++) {
        if (symbolRegex.test(passwordsend[i])) {
            sym = true;
            break;
        } else {
            sym =  false;
       }
      }
      return sym;
}

router.post('/:rank',(req,res) => {
    const rank = req.params.rank;
    let passwordsend = req.body.password
    console.log(passwordsend);
    console.log(rank);
    
    let num = false;
    let lower = false;
    let upper = false;
    let sym = false;


    let notification = "";
    let status = true;

    if (rank == "newbie") {
        num = intcheck(passwordsend,num,true);
        if (num == false) {
            notification = "กรุณาใส่เฉพาะตัวเลขใน Rank Newbie"
            status = false;             
        } else if (num == true) {
            status = true; 
        }
    }

    if (rank == "beginner") {
        lower = lowercasecheck(passwordsend, lower,true);
        if (lower == false) {
            notification = "กรุณาใส่เฉพาะตัวอักษรพิมพ์เล็กใน Rank Beginner";
            status = false;             
        } else if (lower == true) {
            status = true; 
        }
    }
    

    if (rank == "amateur") {
        num = intcheck(passwordsend,num,false);
        if (num == true) {
            notification = "กรุณาใส่เฉพาะตัวอักษรใน Rank Amateur"
            status = false;
        } else {
            upper = uppercasecheck(passwordsend, upper,false)
            lower = lowercasecheck(passwordsend, lower,false);
        if (lower == false && upper == false) {
            notification = "กรุณาใส่ตัวอักษรพิมพ์เล็ก และพิมพ์ใหญ่ใน Rank Amateur";
            status = false;             
        } 
        if (lower == true && upper == false) {
            notification = "กรุณาใส่ตัวอักษรพิมพ์ใหญ่ใน Rank Amateur";
            status = false;             
        }
        if (lower == false && upper == true) {
            notification = "กรุณาใส่ตัวอักษรพิมพ์เล็กใน Rank Amateur";
            status = false;             
        }
        if (lower && upper) {
            status = true;
        }
        }
    }

    if (rank == "semi-pro") {
        num = intcheck(passwordsend,num,false);
        upper = uppercasecheck(passwordsend, upper,false)
        lower = lowercasecheck(passwordsend, lower,false);
        if (num == false) {
            notification = "กรุณาใส่ทั้งตัวอักษร และตัวเลขใน Rank semi-pro"
            status = false;
        } 
        if (lower == false && upper == false && num == false) {
            notification = "กรุณาใส่ตัวอักษรพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลขใน Rank semi-pro";
            status = false;             
        } 
        if (lower == true && upper == false && num == false) {
            notification = "กรุณาใส่ตัวอักษรพิมพ์ใหญ่ และตัวเลขใน Rank semi-pro";
            status = false;             
        }
        if (lower == true && upper == true && num == false) {
            notification = "กรุณาใส่ตัวเลขใน Rank semi-pro";
            status = false;             
        }
        if (lower == false && upper == true && num == true) {
            notification = "กรุณาใส่ตัวอักษรพิมพ์เล็กใน Rank semi-pro";
            status = false;             
        }
        if (lower == true && upper == false && num == true) {
            notification = "กรุณาใส่ตัวอักษรพิมพ์ใหญ่ใน Rank semi-pro";
            status = false;             
        }
        if (lower == false && upper == false && num == true) {
            notification = "กรุณาใส่ตัวอักษรใน Rank semi-pro";
            status = false;             
        }
        if (lower  == true && upper  == true && num  == true ) {
            status = true;
        }
    }

    if (rank == "professional") {
        num = intcheck(passwordsend,num,false);
        upper = uppercasecheck(passwordsend, upper,false)
        lower = lowercasecheck(passwordsend, lower,false);
        sym = symbolcheck(passwordsend,sym);
        if (num && upper && lower && sym) {
            status = true;
            notification = "เก่งมาก คุณผ่านหมดทุกRankแล้ว"
        } else if (!num && !upper && !lower) {
            status = true;
            notification = "กรุณาใส่ตัวเลข ตัวอักษรพิมพ์ใหญ่ และตัวอักษรพิมพ์เล็ก Rank Professional"
        }else if (!sym && !upper && !lower) {
            status = true;
            notification = "กรุณาใส่สัญญาลักษณ์ ตัวอักษรพิมพ์ใหญ่ และตัวอักษรพิมพ์เล็ก Rank Professional"
        }else if (!num && !sym && !lower) {
            status = true;
            notification = "กรุณาใส่ตัวเลข สัญญาลักษณ์ และตัวอักษรพิมพ์เล็ก Rank Professional"
        }else if (!num && !upper && !sym) {
            status = true;
            notification = "กรุณาใส่ตัวเลข สัญญาลักษณ์ และตัวอักษรพิมพ์ใหญ่ Rank Professional"
        }else if (!num && !lower) {
            status = true;
            notification = "กรุณาใส่ตัวเลข และตัวอักษรพิมพ์เล็ก Rank Professional"
        } else if (!num && !upper) {
            status = true;
            notification = "กรุณาใส่ตัวเลข และตัวอักษรพิมพ์ใหญ่ Rank Professional"
        } else if (!num && !sym) {
            status = true;
            notification = "กรุณาใส่สัญญาลักษณ์ และตัวเลข Rank Professional"
        } else if (!lower && !upper) {
            status = true;
            notification = "กรุณาใส่ตัวอักษรพิมพ์ใหญ่ และตัวอักษรพิมพ์เล็ก Rank Professional"
        } else if (!lower && !sym) {
            status = true;
            notification = "กรุณาใส่สัญญาลักษณ์ และตัวอักษรพิมพ์เล็ก Rank Professional"
        } else if (!upper && !sym) {
            status = true;
            notification = "กรุณาใส่ตัวอักษรพิมพ์ใหญ่ และสัญญาลักษณ์ใน Rank Professional"
        } else if (!num) {
            status = true;
            notification = "กรุณาใส่ตัวเลข ใน Rank Professional"
        } else if (!upper) {
            status = true;
            notification = "กรุณาใส่ตัวอักษรพิมพ์ใหญ่ ใน Rank Professional"
        } else if (!lower) {
            status = true;
            notification = "กรุณาใส่ตัวอักษรพิมพ์เล็ก ใน Rank Professional"
        } else if (!sym) {
            status = true;
            notification = "กรุณาใส่สัญญาลักษณ์ ใน Rank Professional"
        }
    }

    console.log("lower" + " " + lower);
    console.log("upper" + " " + upper);
    console.log("sym" + " " + sym);
    console.log(notification);
    const nextrank = nextroute[rank]
    console.log(nextrank)


    if (status == false) {
        res.redirect(`/play/${rank}/${notification}`); 
    } else {
        res.redirect(`/play/${nextrank}/${notification}`); 
    }
});

module.exports = router;