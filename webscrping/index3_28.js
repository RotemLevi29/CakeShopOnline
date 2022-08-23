const puppeteer = require("puppeteer")
const fs = require("fs/promises")
const { log } = require("console")
const url = "https://www.biscotti.co.il/shop/conditoria"
const productPlector = ".catalogItemBox"
const catSlector = ".strip-item"
const path = require("path")



const urls = []

async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const jsonObjects = []
 
    // נתחיל בלהביא את רשימת הקטגוריות, ע"י ביקור בכתובת, חילוץ לפי סלקטור וביצוע פונ' על מערכים ומחרוזות
    const categories = await page.$$eval(catSlector, cat => {
        return cat.map(x => x.innerHTML)
    });
    // console.log(categories);
    console.log("categories.length:", categories.length);
    console.log("__________________________________________")
    console.log("categories[1]", categories[1].split(`>`)[1].split(`<`)[0])
    
    categories.forEach(element => {       
        let cat = element.trim().replace(`<a href="/shop/conditoria/`, "").split(`"`)[0];
        // let cat = element.trim().split(`>`)[1].split(`<`)[0];
        // let obj = {}
        // obj[`${cat}`] = `https://www.biscotti.co.il/shop/conditoria/${cat}`;
        urls.push([`${cat}`,`https://www.biscotti.co.il/shop/conditoria/${cat}`])
        // urls.push(obj)
    });
    // remove first element with is irrelevant
    urls.shift();
    console.log("categorie urls:", urls);
    
    // לשים לב הקטגוריות חוזרות על עצמן, ולכן לקחת רק את 10 האובייקטים הראשונים בכל קטגוריה
    let categoriesUrels = urls.slice(0, 10);

    // אנו יוצרים JSON
    const categoriesJSON = []
    categoriesUrels.forEach((element,index)=>{
        console.log(" categoriesUrels element", element, " categoriesUrels index:", index);
        categoriesJSON[index]={};
        categoriesJSON[index].name = element[0]
        categoriesJSON[index].description = element[0]

    })

    const jsonCategoryString = JSON.stringify(categoriesJSON);
    // fs.writeFile(`./allProducts${currentCategory}.json`, jsonString, err => {
    fs.writeFile(`./allCategories.json`, jsonCategoryString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    // console.log("these are uniqe categorie urls arrays in an array:", categoriesUrels);
    // console.log("first url to visit", categoriesUrels[0][1]);


    // categoriesUrels.forEach((element,index) => console.log("categoriesUrels:",element, index));


const allSuppliersFromDB = 

[{
  "_id": {
    "$oid": "62daa3aa2eaa3cc42d391b51"
  },
  "name": "ossem"
},{
  "_id": {
    "$oid": "62daa3aa2eaa3cc42d391b52"
  },
  "name": "elit"
},{
  "_id": {
    "$oid": "62daa3aa2eaa3cc42d391b53"
  },
  "name": "shani"
},{
  "_id": {
    "$oid": "62daa3aa2eaa3cc42d391b54"
  },
  "name": "diplomat"
},{
  "_id": {
    "$oid": "62daa3aa2eaa3cc42d391b55"
  },
  "name": "max brenner"
}]

    
const allCategoriesFromDB =  
[{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b45"
  },
  "name": "cheescake",
  "description": "cheescake"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b46"
  },
  "name": "cream",
  "description": "cream"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b47"
  },
  "name": "parve-cakes",
  "description": "parve-cakes"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b48"
  },
  "name": "pie",
  "description": "pie"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b49"
  },
  "name": "spongecake",
  "description": "spongecake"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b4a"
  },
  "name": "vegancakes",
  "description": "vegancakes"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b4b"
  },
  "name": "sugarfree",
  "description": "sugarfree"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b4c"
  },
  "name": "yeastcakes",
  "description": "yeastcakes"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b4d"
  },
  "name": "cookies",
  "description": "cookies"
},{
  "_id": {
    "$oid": "62daa3222eaa3cc42d391b4e"
  },
  "name": "pastry",
  "description": "pastry"
}]
// עכשו נבקר בכתובת ספציפית מתוך המערך שלנו ונחלץ משם את האובייקטים, כך נוכל לתת להם את שם הקטגוריה הנכון
// מכאן למעשה מתחילה העבודה של ה scapping עצמו


// for (let i = 0; i < 0; i++) {
for (let i = 0; i <10; i++) {
  
  const currentCategory = i;
  // const currentCategory = 0;
    let catDbId = allCategoriesFromDB.filter(element => element.name == categoriesUrels[currentCategory][0])[0]["_id"]['$oid']
    console.log("catDbId raw", catDbId);
    // console.log("catDbId", catDbId[0]["_id"]['$oid']);

    
    await page.goto(categoriesUrels[currentCategory][1]);
    
    const products = await page.$$eval(productPlector, product => {
      return product.map(x => x.innerHTML)
    });
    
    // console.log(products);
    console.log("products.length:", products.length);
    
    const entries = Object.entries(products);
    
    
    for (const [i, v] of entries.entries()) {
      jsonObjects[i] = v[1].split("\n")
    }
    
    console.log(jsonObjects[0].forEach((element, index) => console.log("index:", index, ":",element)));
    
    const realJsonObjects = [];
    
    for (const [index, element] of jsonObjects.entries()) {
      realJsonObjects[index] = {}
      realJsonObjects[index].imageName = element[4].trim().replace(`<img loading="lazy" src="/warehouse/dynamic/`, "").split(`"`)[0]
      realJsonObjects[index].name = element[8].trim().replace(`<h3 class="itemTitle">`, "").replace(`</h3>`, "")
      realJsonObjects[index].categoryId = {"$oid": catDbId}    
      // realJsonObjects[index].categoryName = {"$oid": categoriesUrels[currentCategory][0]}    
      realJsonObjects[index].supllierId = {"$oid": allSuppliersFromDB[Math.floor(Math.random() * 5)]["_id"]["$oid"]}    
      realJsonObjects[index].price = element[10].trim().split(`₪`)[0]




      // for (let i = 0; i < 1000; i++) {
      //   console.log(allSuppliersFromDB[Math.floor(Math.random() * 5)]["_id"]["$oid"])}
        
        

    }
    
    console.log(realJsonObjects[0]);
    const absolutePath = path.join(__dirname, "./upload/");
    console.log('absolutePath:', absolutePath)
    
    const jsonString = JSON.stringify(realJsonObjects);
    // fs.writeFile(`./allProducts${currentCategory}.json`, jsonString, err => {
      fs.writeFile(`./allProducts${currentCategory}.json`, jsonString, err => {
        if (err) {
          console.log('Error writing file', err)
        } else {
          console.log('Successfully wrote file')
        }
    })
    
    const photos = await page.$$eval("img", imgs => {
      return imgs.map(x => x.src)
    });
    console.log(photos);
    
    
    for (const photo of photos) {
      const imagepage = await page.goto(photo)
      await fs.writeFile(absolutePath+photo.split("/").pop(), await imagepage.buffer())
    }
    
  }
    
    await browser.close()
  }
  
  start();
  