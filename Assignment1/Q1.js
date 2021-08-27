var json = require("./battles.json");

attacker_king_count = {}
defender_king_count = {}
region_count = {}
name_count = {}
win = 0
loss = 0
battle_type_unique = new Set([])
defender_size_list = []

result = {
    most_active:{
        attacker_king: '',
        defender_king: '',
        region: '',
        name: '' 
    },
    attacker_outcome:{
        win: 0, // total win
        loss: 0 // total loss
    },
    battle_type:[], // unique battle types
    defender_size:{
        average: 0,
        min: 0,
        max: 0
        }
    }
// most_active
const counting = (counter,counting_element) => {
    json.forEach(battle => {
        if (battle[counting_element] in counter){
            counter[battle[counting_element]] += 1;
        }else{
            counter[battle[counting_element]] = 1
        }
    })
}

const most_active = (active) => {
    most_active_result = ''
    let max = 0
    for (element in active){
        if (max < active[element]){
            max = active[element]
            most_active_result = element
        }
    }
    return most_active_result
}
//attacker_outcome
const win_loss_count = () => {
    json.forEach(battle => {
        if ( battle['attacker_outcome'] === "win" ){
            win += 1
        }else{
            loss += 1
        }
    })
}
//battle_type
const battle_type_unique_fn = () =>{
    json.forEach(battle => {
            battle_type_unique.add(battle['battle_type'])
    })
}
//defender_size
const defender_size_count = () => {
    json.forEach(battle => {
        defender_size_list.push(battle['defender_size'])
    })
    defender_size_list = defender_size_list.map(element => element === null ? 0 : element)
}

counting(attacker_king_count, 'attacker_king')
counting(defender_king_count, 'defender_king')
counting(region_count, 'region')
counting(name_count, 'name')

win_loss_count()
battle_type_unique_fn()
defender_size_count()

result.most_active.attacker_king = most_active(attacker_king_count)
result.most_active.defender_king = most_active(defender_king_count)
result.most_active.region = most_active(region_count)
result.most_active.name = most_active(name_count)
result.attacker_outcome.win = win
result.attacker_outcome.loss = loss
result.battle_type =  [...battle_type_unique]
result.defender_size.average = defender_size_list.reduce((sum, element) => sum + element,0)/defender_size_list.length;
result.defender_size.max = defender_size_list.reduce((a,b) => a > b ? a : b);
result.defender_size.min = defender_size_list.reduce((a,b) => a < b ? a : b);

console.log(result)