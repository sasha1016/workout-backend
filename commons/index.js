const ACCESSORY = `accessory` ; 
const MAIN = `main` ; 
const STRENGTH = `strength` ; 
const HYPERTROPHY = `hypertrophy` ; 
const PERCENTAGE = `percentage` ; 
const ABSOLUTE = `absolute` ; 

const LIFTS = [ACCESSORY,MAIN] ; 
const LIFT_TYPES = [STRENGTH,HYPERTROPHY] ;
const WEIGHT_FACTORS = [PERCENTAGE,ABSOLUTE] ; 
const MAIN_LIFTS = ['squat','bench','deadlift'] ; 
const ACCESSORY_LIFTS = ['back','biceps','triceps','chest','core','legs','shoulders'] ; 

const DAYS = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] ; 



module.exports = {
    LIFTS,
    MAIN_LIFTS,
    ACCESSORY_LIFTS,
    ACCESSORY,
    MAIN,
    STRENGTH,
    HYPERTROPHY,
    PERCENTAGE,
    ABSOLUTE,
    LIFT_TYPES,
    WEIGHT_FACTORS,
    DAYS
}