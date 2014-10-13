<?php

// Authenticate via API Key

$client = new Tumblr\API\Client('RPXpf7H2WvWaMRIIjV0YZXpNFUz0PZ0wyf070nnIZHEt59BX5M');

// Make the request

$client->getBlogPosts('loritchie500.tumblr.com', array('type' => 'text'));

$data = $client;