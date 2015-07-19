#pragma strict

public var planet_prefab : GameObject;
private var planet_current : GameObject;
private var planet_prev : GameObject;
private var count : int = 1;
private var player : GameObject;

function spawn_planet_at(x : int, y : int, z : int) {
    spawn_planet_at(Vector3(x, y, z));
}

function spawn_planet_at(position : Vector3) {

    planet_prev = planet_current;

    planet_current = Instantiate(planet_prefab);
    planet_current.transform.position = position;
    planet_current.GetComponent.<planet>().id = count++;
}

function spawn_planet() {

    var direction : Vector3 = planet_current.transform.position -
        planet_prev.transform.position;
    direction = Quaternion.Euler(0, 0, Random.Range(-30, 30)) * direction;
    direction *= Random.Range(80, 120) / 100f;
    var spawn_position = planet_current.transform.position + direction;

    var distance : float = Vector2.Distance(spawn_position,
            planet_prev.transform.position);

    var planet_radius =
        planet_current.GetComponent.<Renderer>().bounds.extents.x;

    if (distance < planet_radius * 12)
        spawn_position = planet_current.transform.position + direction * 1.2;
    else if (distance > planet_radius * 17)
        spawn_position = planet_current.transform.position + direction * 0.8;

    spawn_planet_at(spawn_position);
}

function Start() {

    spawn_planet_at(0, 0, 0);
    spawn_planet_at(7, 10, 0);

    for (var i = 0; i < 5; i++)
        spawn_planet();

    player = GameObject.FindGameObjectWithTag("Player");
}

function Update() {
    if (count - 5 < player.GetComponent.<shipcontroller>().score)
        spawn_planet();
}
