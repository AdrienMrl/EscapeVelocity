#pragma strict

private var SpaceShip : GameObject;
private var mass : float = 200;
private var gravity : float;
private var radius : float;
public var asteroid_prefab : GameObject;
private var asteroid : GameObject;
public  var id : int;
private var planet_color : Color;
public var done : boolean = false;
private var time : float = 0;

function Start () {

    done = false;

    SpaceShip = GameObject.FindGameObjectWithTag("Player");
    transform.GetChild(0).GetComponent
        .<ParticleSystem>().enableEmission = false;

    // setup physics
    radius = gameObject.GetComponent.<Renderer>().bounds.extents.x;
    gravity = radius * mass;

    // randomly choose a color
    planet_color = getRandomColor();
    GetComponent.<SpriteRenderer>().color = planet_color;
    planet_color = Color.white;


    if (tag == "asteroid")
        gravity = 0;

    if (tag != "asteroid") {
        tag = "planet";
        // randomly choose a size
        transform.localScale *= Random.Range(50, 150) / 100f;

        if (id >= 10 && !Random.Range(0, 5))
            spawnAsteroid();
    }

}

function spawnAsteroid() {
    asteroid = Instantiate(asteroid_prefab);

    asteroid.GetComponent.<Rigidbody2D>().mass = 30;
    var scale = Random.Range(5, 10) / 100f;
    asteroid.transform.localScale.x = scale;
    asteroid.transform.localScale.y = scale;
    asteroid.transform.position = transform.position;

    if (Random.Range(0, 2)) {
        asteroid.transform.position.x += radius * Random.Range(11, 30) / 10;
    } else {
        asteroid.transform.position.x -= radius * Random.Range(11, 30) / 10;
    }

    if (Random.Range(0, 2)) {
        asteroid.GetComponent.<Rigidbody2D>().velocity = Vector3.down;
    } else {
        asteroid.GetComponent.<Rigidbody2D>().velocity = Vector3.up;
    }


    asteroid.tag = "asteroid";
}

function hsv_to_rgb(h : float, s : float, v : float) {
    var h_i : int = h*6f;
    var f = h*6 - h_i;
    var p = v * (1 - s);
    var q = v * (1 - f*s);
    var t = v * (1 - (1 - f) * s);

    if (h_i==0) return [v, t, p];
    if (h_i==1) return [q, v, p];
    if (h_i==2) return [p, v, t];
    if (h_i==3) return [p, q, v];
    if (h_i==4) return [t, p, v];
    else        return [v, p, q];
}

function getRandomColor() {

    var golden_ratio_conjugate = 0.618033988749895;
    var h : float = Random.Range(0, 1000) / 1000f;
    h += golden_ratio_conjugate;
    h = h % 1.0;
    var colors = hsv_to_rgb(h, 0.5, 0.6);
    return new Color(colors[0], colors[1], colors[2]);
}


function applyGravityToObject(object : GameObject) {

    var obj_dist_from_center : float =
        Vector2.Distance(transform.position, object.transform.position);
    var multiplier : float = (radius * 2f) / obj_dist_from_center;
    if (multiplier > 1)
        multiplier = 1;
    multiplier = Mathf.Pow(multiplier, 3);
    object.GetComponent.<Rigidbody2D>().AddForce(
            (transform.position - object.transform.position)
            * Time.deltaTime * gravity * multiplier);
}

function validate() {


    if (planet_color == Color.white)
        planet_color = GetComponent.<Renderer>().material.color;

    GetComponent.<Renderer>().material.color =
        Color.Lerp(planet_color, planet_color * 1.1, time * 10);

    time += Time.deltaTime;

    transform.GetChild(0).GetComponent.<ParticleSystem>().enableEmission = true;
    if (time >= 0.1)
    transform.GetChild(0).GetComponent.<ParticleSystem>().enableEmission = false;
}

function Update () {

    applyGravityToObject(SpaceShip);

    var shipItems: GameObject[];
    shipItems = GameObject.FindGameObjectsWithTag("items");
    for (var obj : GameObject in shipItems)
        applyGravityToObject(obj);
    if (asteroid != null)
        applyGravityToObject(asteroid);
 
    if (done)
        validate();
}
