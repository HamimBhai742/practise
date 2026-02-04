import cron from "node-cron";
import { dailyReminders } from "./dailyRemindersNotifaction";
// import prisma from "./prisma";
// import { firebasePushNotificationServices } from "../modules/Firebase/firebasePushNotificationServices";


// 🔹 Random motivational reminder select করার ফাংশন

function getRandomReminder(): string {
  return dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
}
console.log(getRandomReminder())
// 🔹 আজকের দিনের শুরুর এবং শেষের সময় বের করা

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}


  export const cronJob=()=>{
    
    cron.schedule("0 12 * * *", async () => {
  console.log("🕛 Running daily reminder job...");

});

getTodayRange()

}
