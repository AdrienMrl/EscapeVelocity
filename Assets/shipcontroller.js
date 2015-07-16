#pragma strict

private var power : float = 500.0;
private var initial_velocity : float = 4.0;
public var ship_item_prefab : GameObject;
public var score : int = 1;
public var text_score : UnityEngine.UI.Text;

function Start () {
    GetComponent.<Rigidbody2D>().velocity =
        transform.up * initial_velocity;
    text_score.text = score.ToString();
}

function find_closest_planet() {
    var planets = GameObject.FindGameObjectsWithTag("planet");

    var distance_min = -1;
    var id = -1;

    for (var p : GameObject in planets) {
        var distance = Vector3.Distance(p.transform.position,
                transform.position);
        if (distance < distance_min || distance_min < 0) {
            distance_min = distance;
            id = p.GetComponent.<planet>().id;
        }
    }
    return id;
}

function Update () {

    if (Input.GetKey("space") || Input.touchCount > 0)
        GetComponent.<Rigidbody2D>()
            .AddForce(transform.up * Time.deltaTime * power);

    var dir : Vector2 = transform.GetComponent.<Rigidbody2D>().velocity;
    var angle : float = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;
    angle -= 90;
    transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);

    var planet_id = find_closest_planet();
    if (planet_id > score) {
        score = planet_id;
        text_score.text = score.ToString();
    }
}

function OnCollisionEnter2D(collision : Collision2D) {
    if (collision.gameObject.tag == "items")
        return;

    for (var i = 0; i < 100; i++) {
        var prefab : GameObject = Instantiate(ship_item_prefab);
        prefab.transform.position = transform.position;
        prefab.GetComponent.<Rigidbody2D>().velocity =
            GetComponent.<Rigidbody2D>().velocity * 1.5;
        prefab.tag = "items";
    }
    gameObject.SetActive(false);
}
