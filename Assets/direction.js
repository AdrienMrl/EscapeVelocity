#pragma strict

private var player : GameObject;

function Start () {
    player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
   var player_score = player.GetComponent.<shipcontroller>().score; 

   var planets = GameObject.FindGameObjectsWithTag("planet");
   var target_planet : GameObject = null;
   for (var p: GameObject in planets)
       if (p.GetComponent.<planet>().id == player_score + 1)
           target_planet = p;

   if (target_planet != null) {

       var dir : Vector2 = player.transform.position
           - target_planet.transform.position;
       var angle : float = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;
       angle -= 180;
       transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);
   }
}
