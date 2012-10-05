SELECT uid, name, pic_square FROM user WHERE uid IN (SELECT uid FROM page_fan WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND page_id IN (SELECT page_id FROM page WHERE "Climbing" IN name OR "Rock climbing" IN name OR "Rock Climbing" IN name OR "Bouldering" IN name OR "Travelling" IN name))

{
  "data": [
    {
      "page_id": 107455672610208
    }, 
    {
      "page_id": 112636102085435
    }, 
    {
      "page_id": 68075418448
    }, 
    {
      "page_id": 10005678795
    }, 
    {
      "page_id": 108732599159106
    }, 
    {
      "page_id": 103971663023084
    }, 
    {
      "page_id": 94394901086
    }, 
    {
      "page_id": 9611673550
    }, 
    {
      "page_id": 46280157253
    }, 
    {
      "page_id": 112003352149145
    }, 
    {
      "page_id": 221677551234032
    }, 
    {
      "page_id": 167896156676302
    }, 
    {
      "page_id": 120465184633169
    }, 
    {
      "page_id": 252240331465481
    }, 
    {
      "page_id": 334170189935631
    }, 
    {
      "page_id": 110778582280184
    }, 
    {
      "page_id": 89041380369
    }, 
    {
      "page_id": 73666494065
    }, 
    {
      "page_id": 108124732555548
    }, 
    {
      "page_id": 55563589918
    }, 
    {
      "page_id": 162337967156555
    }, 
    {
      "page_id": 108072941701
    }, 
    {
      "page_id": 234103858087
    }, 
    {
      "page_id": 133810256689313
    }, 
    {
      "page_id": 110229189007139
    }, 
    {
      "page_id": 31796128843
    }
  ]
}