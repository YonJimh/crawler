const puppeteer = require('puppeteer');
const {screenshot,images_path} = require('./config/default');
const srcToImg = require('./helper/srcToImg');
const userAgents = require('./config/userAgent');

(async () => {
  const browser = await puppeteer.launch({
    // const browser = await puppeteer.launch({headless: false}); // default is true
    executablePath: './chromium/chrome.exe',
    timeout:0,
    // headless:false
  });
  const page = await browser.newPage();
  await page.goto('http://image.baidu.com/',{waitUntil:'networkidle2'});// waitUntil: 'networkidle', // 等待网络状态为空闲的时候才继续执行
  console.log('go to http://image.baidu.com/');
  // const userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
  // console.log(userAgent);
  //设置用户代理
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  await page.setViewport({
      width:1920,
      height:5000
  }); // 用这个api实现浏览器窗口超级大 加载图片更多
 
  await page.focus('#kw'); //将焦点放到输入框
  await page.keyboard.sendCharacter('动漫'); //输入内容
  await page.click('.s_search');  //点击搜索框
  console.log('get to search list');

  page.on('load',async ()=>{  //因为要图片加载完 这里不需要一步了

    console.log('图片加载完成!');

    const srcs = await page.evaluate(()=>{  //跑在一个沙盒中 page.evaluate 这个 方法里面是不能直接 使用外部参数的
        const images = document.querySelectorAll('img.main_img');
       
        return Array.prototype.map.call(images,img => img.src);  //它要想用 Array 的那些方法 将 NodeList 转换为数组
    }); 
    console.log(`get ${srcs.length} images,start down`) 
    

    srcs.forEach(async (src)=>{
        await page.waitFor(500);
        await srcToImg(src,images_path); //保存到images文件夹
    });
    await browser.close();
  });

  // page.$获取一个元素  page.$$获取多个元素 page.$eval获取多个元素回调可以获取元素
 
})(); 