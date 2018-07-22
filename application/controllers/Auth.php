<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

/*
 * Changes:
 * 1. This project contains .htaccess file for windows machine.
 *    Please update as per your requirements.
 *    Samples (Win/Linux): http://stackoverflow.com/questions/28525870/removing-index-php-from-url-in-codeigniter-on-mandriva
 *
 * 2. Change 'encryption_key' in application\config\config.php
 *    Link for encryption_key: http://jeffreybarke.net/tools/codeigniter-encryption-key-generator/
 * 
 * 3. Change 'jwt_key' in application\config\jwt.php
 *
 */

class Auth extends REST_Controller
{
    /**
     * URL: http://localhost/CodeIgniter-JWT-Sample/auth/token
     * Method: GET
     */
    
    public function __construct()
    {
            parent::__construct();
            header_remove('Access-Control-Allow-Origin');
            //header('Access-Control-Allow-Origin: *');
           // header('Access-Control-Allow-Origin: *');
            // $this->output->set_header("Access-Control-Allow-Origin: *");

            $this->load->model('Api_model');
            $this->load->helper('url_helper');
    }

    /**
     * URL: http://localhost/CodeIgniter-JWT-Sample/auth/token
     * Method: POST
     * Header Key: Authorization
     * Value: Auth token generated in GET call
     */
    public function token_post()
    {
        $headers = $this->input->request_headers();

        if (array_key_exists('Authorization', $headers) && !empty($headers['Authorization'])) {
            $decodedToken = AUTHORIZATION::validateToken($headers['Authorization']);
            if ($decodedToken != false) {
                $this->set_response($decodedToken, REST_Controller::HTTP_OK);
                return;
            }
        }
        $response = array("STATUS"=>"NOK","RESPONSE"=>"Unauthorised");
        $this->set_response($response, REST_Controller::HTTP_UNAUTHORIZED);
    }
    
    
    public function validateLogin_post()
    {	 
        $data = array("username"=>$this->post("username"),"password"=>$this->post("password"));
        $tokenData = array();
        $result = $this->Api_model->login($data);
        if($result) {
            $result = $result[0];
            $tokenData['id'] = $result->id;
            $tokenData['email'] = $result->user_email;
            $tokenData['mobile'] = $result->user_mobile;
            $tokenData['type'] = $result->user_type;
            $output['token'] = AUTHORIZATION::generateToken($tokenData);
            $output['user_type'] = $result->user_type;
            $output['user_name'] = $result->user_name;

            $response = array("STATUS"=>"OK","RESPONSE"=>$output);
            $this->set_response($response, REST_Controller::HTTP_OK);
        
        } else {
           $response = array("STATUS"=>"NOK","RESPONSE"=>"Unauthorised");
           $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
    }
    public function validateLogin_get()
    {	 
        $this->set_response("Unauth1orised", REST_Controller::HTTP_OK);
    }
    public function validateToken_get(){
        $headers = $this->input->request_headers();
        if (array_key_exists('authorization', $headers) && !empty($headers['authorization'])) {
            $decodedToken = AUTHORIZATION::validateToken($headers['authorization']);
            if ($decodedToken != false) {
                $this->set_response($decodedToken, REST_Controller::HTTP_OK);
                return;
            }
        }

        $this->set_response("Unauthorised", REST_Controller::HTTP_UNAUTHORIZED);
    }
}