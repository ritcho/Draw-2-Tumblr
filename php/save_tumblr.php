<?php

#Requires PHP 5.3.0

define("CONSUMER_KEY", "RPXpf7H2WvWaMRIIjV0YZXpNFUz0PZ0wyf070nnIZHEt59BX5M");
define("CONSUMER_SECRET", "iEnFsCzrPOKzkV7R8c61tRHusJWKIJo86y6YzdGZKjCtbUeapA");
define("OAUTH_TOKEN", "z54qmahUeDFCYb4LBlzMFA6PcGyHpj1OBW6zeP5VlxkKcHEllw");
define("OAUTH_SECRET", "UQykWBNhqYfQwg3wjNq46Zy84U8CybLwOB5h4yKDjWC7orZhAT");

function oauth_gen($method, $url, $iparams, &$headers) {
    
    $iparams['oauth_consumer_key'] = CONSUMER_KEY;
    $iparams['oauth_nonce'] = strval(time());
    $iparams['oauth_signature_method'] = 'HMAC-SHA1';
    $iparams['oauth_timestamp'] = strval(time());
    $iparams['oauth_token'] = OAUTH_TOKEN;
    $iparams['oauth_version'] = '1.0';
    $iparams['oauth_signature'] = oauth_sig($method, $url, $iparams);
    print $iparams['oauth_signature'];  
    $oauth_header = array();
    foreach($iparams as $key => $value) {
        if (strpos($key, "oauth") !== false) { 
           $oauth_header []= $key ."=".$value;
        }
    }
    $oauth_header = "OAuth ". implode(",", $oauth_header);
    $headers["Authorization"] = $oauth_header;
}

function oauth_sig($method, $uri, $params) {
    
    $parts []= $method;
    $parts []= rawurlencode($uri);
   
    $iparams = array();
    ksort($params);
    foreach($params as $key => $data) {
            if(is_array($data)) {
                $count = 0;
                foreach($data as $val) {
                    $n = $key . "[". $count . "]";
                    $iparams []= $n . "=" . rawurlencode($val);
                    $count++;
                }
            } else {
                $iparams[]= rawurlencode($key) . "=" .rawurlencode($data);
            }
    }
    $parts []= rawurlencode(implode("&", $iparams));
    $sig = implode("&", $parts);
    return base64_encode(hash_hmac('sha1', $sig, CONSUMER_SECRET."&". OAUTH_SECRET, true));
}

// Take IMG Data and decode

$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);

// upload to tumblr 

$headers = array("Host" => "http://api.tumblr.com/", "Content-type" => "application/x-www-form-urlencoded", "Expect" => "");
$params = array("data" => array($data),
"type" => "photo");

// removed: file_get_contents("drawing.jpg")

$blogname = "loritchie500.tumblr.com";
oauth_gen("POST", "http://api.tumblr.com/v2/blog/$blogname/post", $params, $headers);

$ch = curl_init();
curl_setopt($ch, CURLOPT_USERAGENT, "PHP Uploader Tumblr v1.0");
curl_setopt($ch, CURLOPT_URL, "http://api.tumblr.com/v2/blog/$blogname/post");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: " . $headers['Authorization'],
    "Content-type: " . $headers["Content-type"],
    "Expect: ")
);

$params = http_build_query($params);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

$response = curl_exec($ch);
print $response;
?>