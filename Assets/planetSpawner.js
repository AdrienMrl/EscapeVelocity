#pragma strict

public var planet_prefab : GameObject;
private var planet_current : GameObject;
private var planet_prev : GameObject;

function spawn_planet_at(x : int, y : int, z : int) {
    spawn_planet_at(Vector3(x, y, z));
}

function spawn_planet_at(position : Vector3) {

    planet_prev = planet_current;

    planet_current = Instantiate(planet_prefab);
    planet_current.transform.position = position;
}

function spawn_planet() {

    var direction : Vector3 = planet_current.transform.position -
        planet_prev.transform.position;
    direction = Quaternion.Euler(0, 0, Random.Range(-20, 20)) * direction;
    direction *= Random.Range(80, 120) / 100f;
    var spawn_position = planet_current.transform.position + direction;

    var distance : float = Vector2.Distance(spawn_position,
            planet_prev.transform.position);

    spawn_planet_at(spawn_position);
}

function Start() {

    spawn_planet_at(0, 0, 0);
    spawn_planet_at(3, 8, 0);

    for (var i = 0; i < 100; i++)
        spawn_planet();
}
