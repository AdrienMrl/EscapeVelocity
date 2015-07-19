#pragma strict

private var player : GameObject;

function Start () {
    player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
    if ((Input.touchCount > 0 || Input.GetKey("space")) &&
            !player.GetComponent.<shipcontroller>().isAlive)
; //        Application.LoadLevel(Application.loadedLevel);
}
