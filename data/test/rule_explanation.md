{
  "operator": "AND",
  "conditions": [
    {
      "operator": "Equal",
      "field": "srcip",
      "value": "10.10.1.1"
    }, 
    {
      "operator": "OR",
      "conditions": [
        {
          "operator": "Equal",
          "field": "dstip",
          "value": "10.10.1.4"
        }, 
        {
          "operator": "Equal"
          "field": "port",
          "value": 2
        } 
      ]
    }, 
    {
      "operator": "AND",
      "conditions": [
        {
          "field": "sentbyte",
          "value": 50,
          "operator": "Equal"
        },
        {
          "field": "rcvdbyte",
          "value": 30,
          "operator": "Equal"
        } 
      ]
    }, 
    {
      "operator": "Equal",
      "field": "user",
      "value": "saksham"
    } 
  ]
}

/* ----------------- */

{
  "operator": "AND",
  "conditions": [
    a, 
    {
      "operator": "OR",
      "conditions": [
        b, 
        c
      ]
    }, 
    {
      "operator": "AND",
      "conditions": [
        d,
        e 
      ]
    }, 
    f 
  ]
}

(a AND (b or c ) AND ( d and e) AND  f ) 