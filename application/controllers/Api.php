<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Api extends REST_Controller {

	public function __construct($config = 'rest')
    {
        
      

        parent::__construct();
        // $this->output->set_header("Access-Control-Allow-Origin: *");
        header_remove('Access-Control-Allow-Origin');

        $this->load->model('Api_model');
            $this->load->helper('url_helper');
            /*$this->isAuth = $this->Api_model->validateToken($this->post());*/
            $this->isAuth = $this->Api_model->validateToken();
            $this->userType = $this->isAuth->type;
            if(!$this->isAuth){
                $this->set_response("Unauthorised", REST_Controller::HTTP_UNAUTHORIZED);
                return;
            }
    }
    
    /** Land master**/

    /*
    $this->get('blah'); // GET param
    $this->post('blah'); // POST param
    $this->put('blah'); // PUT param*/
   
    public function lands_get($id=""){
       if(!empty($this->isAuth)){
           $options = array();
           if($id){
               $options["where"] = "site_id = ".$id ;
           }
           $return = $this->Api_model->getLands($options);
           $response = array("STATUS"=>"OK","RESPONSE"=>$return);
           $this->set_response($response, REST_Controller::HTTP_OK);
       } 
        
    }

    /*public function lands_post($id=""){
       if(!empty($this->isAuth)){
           $options = array();
           if($id){
               $options["where"] = "site_id = ".$id ;
           }
           $return = $this->Api_model->getLands($options);
           $response = array("STATUS"=>"OK","RESPONSE"=>$return);
           $this->set_response($response, REST_Controller::HTTP_OK);
       } 
        
    }*/

    public function addLand_post(){
        if(!empty($this->isAuth)){
            $POST = $this->post();
        $data = array(
                        "site_name" => $POST['site_name'],
                        "survey_no"=> $POST['survey_no'],
                        "city"=> $POST['city'],
                        "area"=>$POST['area'],
                        "inst_month"=>$POST['inst_month'],
                        "inst_amount"=>$POST['inst_amount'],
                        "Total_amount"=>$POST['Total_amount'],
                        
                );
        $table = "land_master";
        $id = $this->Api_model->insert_data($table,$data);
        if($id){
            $this->lands_get($id);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }
    
    public function editLand_post($id){
        if(!empty($this->isAuth)){
        $POST = $this->post();
        $data = array(
                        "site_name" => $POST['site_name'],
                        "survey_no"=> $POST['survey_no'],
                        "city"=> $POST['city'],
                        "area"=>$POST['area'],
                        "inst_month"=>$POST['inst_month'],
                        "inst_amount"=>$POST['inst_amount'],
                        "Total_amount"=>$POST['Total_amount'],
                        
                );
        $table = "land_master";	
        $id = $this->Api_model->update_data($table,$data, array('site_id'=>$id));
        if($id){
            $this->lands_get($id);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }
    
   
    public function deleteLand_post($id){
        if(!empty($this->isAuth)){
        
        $table = "land_master";	
        $id = $this->Api_model->delete_data($table, array('site_id'=>$id));
        if($id){
            $response = array("STATUS"=>"OK","RESPONSE"=>"Data Deleted");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to Deleta");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }

    public function deleteCustomerLand_post($id){
        if(!empty($this->isAuth)){
        
        $table = "land_booking";	
        $id = $this->Api_model->delete_data($table, array('id'=>$id));
        if($id){
            $response = array("STATUS"=>"OK","RESPONSE"=>"Data Deleted");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to Deleta");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }

    public function deleteCustomerChit_post($id){
        if(!empty($this->isAuth)){
        
        $table = "chit_booking";	
        $id = $this->Api_model->delete_data($table, array('id'=>$id));
        if($id){
            $response = array("STATUS"=>"OK","RESPONSE"=>"Data Deleted");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to Deleta");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }

    public function deleteCustomerAgar_post($id){
        if(!empty($this->isAuth)){
        
        $table = "agar_booking";    
        $id = $this->Api_model->delete_data($table, array('id'=>$id));
        if($id){
            $response = array("STATUS"=>"OK","RESPONSE"=>"Data Deleted");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to Deleta");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }


    /** Chit master**/

    /*
    $this->get('blah'); // GET param
    $this->post('blah'); // POST param
    $this->put('blah'); // PUT param*/
    
    public function chits_get($id=""){
       if(!empty($this->isAuth)){
           $options = array();
           if($id){
               $options["where"] = "chit_id = ".$id ;
           }
           $return = $this->Api_model->getChits($options);
           $response = array("STATUS"=>"OK","RESPONSE"=>$return);
           $this->set_response($response, REST_Controller::HTTP_OK);
       } 
        
    }
    public function addChit_post(){
        if(!empty($this->isAuth)){
            $POST = $this->post();
        $data = array(
                        "fund_type" => $POST['fund_type'],
                        "inst_month"=>$POST['inst_month'],
                        "inst_amount"=>$POST['inst_amount'],
                        "total_amount"=>$POST['total_amount'],
                );
        $table = "chit_master";
        $id = $this->Api_model->insert_data($table,$data);
        if($id){
            $this->chits_get($id);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }
    
    public function editChit_post($id){
        if(!empty($this->isAuth)){
        $POST = $this->post();
        $data = array(
                        "fund_type" => $POST['fund_type'],
                        "inst_month"=>$POST['inst_month'],
                        "inst_amount"=>$POST['inst_amount'],
                        "total_amount"=>$POST['total_amount'],
                );
        $table = "chit_master"; 
        $id = $this->Api_model->update_data($table,$data, array('chit_id'=>$id));
        if($id){
            $this->chits_get($id);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }
    
   
    public function deleteChit_post($id){
        if(!empty($this->isAuth)){
        
        $table = "chit_master"; 
        $id = $this->Api_model->delete_data($table, array('chit_id'=>$id));
        if($id){
            $response = array("STATUS"=>"OK","RESPONSE"=>"Data Deleted");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to Deleta");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }




    /** Chit master**/

    /*
    $this->get('blah'); // GET param
    $this->post('blah'); // POST param
    $this->put('blah'); // PUT param*/
    
    public function agars_get($id=""){
       if(!empty($this->isAuth)){
           $options = array();
           if($id){
               $options["where"] = "site_id = ".$id ;
           }
           $return = $this->Api_model->getAgars($options);
           $response = array("STATUS"=>"OK","RESPONSE"=>$return);
           $this->set_response($response, REST_Controller::HTTP_OK);
       } 
        
    }
    public function addAgar_post(){
        if(!empty($this->isAuth)){
            $POST = $this->post();
            $data = array(
                            "site_name" => $POST['site_name'],
                            "no_tree"=>$POST['no_tree'],
                            "tree_amount"=>$POST['tree_amount'],
                    );
            $table = "tree_master";
            $id = $this->Api_model->insert_data($table,$data);
            if($id){
                $this->agars_get($id);
            }else{
                $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
                $this->set_response($response, REST_Controller::HTTP_OK);
            }
        
       } 
    }
    
    public function editAgar_post($id){
        if(!empty($this->isAuth)){
        $POST = $this->post();
        $data = array(
                        "site_name" => $POST['site_name'],
                        "no_tree"=>$POST['no_tree'],
                        "tree_amount"=>$POST['tree_amount'],
                );
        $table = "tree_master";
        $id = $this->Api_model->update_data($table,$data, array('site_id'=>$id));
        if($id){
            $this->agars_get($id);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }
    
   
    public function deleteAgar_post($id){
        if(!empty($this->isAuth)){
        
        $table = "tree_master"; 
        $id = $this->Api_model->delete_data($table, array('site_id'=>$id));
        if($id){
            $response = array("STATUS"=>"OK","RESPONSE"=>"Data Deleted");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to Deleta");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }


    public function registerCustomer_post($type){
        if(!empty($this->isAuth)){
            if($this->userType !=3){
                $POST = $this->post();
                if(isset($POST['user_mobile']) && !empty($POST['user_mobile'])){
                    $options = array();
                    $userId =  $POST['user_mobile'];
                    $options["where"] = "user_name = '".$userId."'" ;
                    $userDetail = $this->Api_model->getUsers($options);
                     
                    if(!$userDetail["count"]){
                        $data = array(
                                    "user_name" => $POST['user_mobile'],
                                    "user_password" => md5($POST['user_mobile']),
                                    "user_mobile" => $POST['user_mobile'],
                                    "user_email"=>(isset($POST['email_id']) && !empty($POST['email_id']) ? $POST['email_id']: ""),
                                    "user_type"=>3,
                                );      
                        $table = "user_login";
                        $id = $this->Api_model->insert_data($table,$data);
                        if($id){
                                $userId =  $POST['user_mobile'];
                                $options["where"] = "id = ".$id;
                                $userDetail = $this->Api_model->getUsers($options);
                                
                        }else{
                            $response = array("STATUS"=>"NOK","RESPONSE"=>"Registration Failed");
                            $this->set_response($response, REST_Controller::HTTP_OK);
                        }
                    }
                    $options = array();
                    $userId =  $POST['user_mobile'];
                    $options["where"] = "mobile = '".$userId."'" ;
                    $customerDetail = $this->Api_model->getCustomers($options);
                    if($type == "land"){
                        $t_id= 1;
                    }else if($type == "chit"){
                        $t_id= 2;
                    }else{
                        $t_id= 3;
                    }
                    if(!$customerDetail["count"]){
                        $data = array(
                                    "login_id" => $userDetail["data"][0]["id"],
                                    "name" => $POST['name'],
                                    "mobile" => $POST['user_mobile'],
                                    "email_id"=>(isset($POST['email_id']) && !empty($POST['email_id']) ? $POST['email_id']: ""),
                                    "address"=>$POST['address'],
                                    "added_by"=>$this->isAuth->id,
                                    "type"=>$t_id,
                                );      
                        $table = "customers";
                        $id = $this->Api_model->insert_data($table,$data);
                    }
                    $options = array();
                    $userId =  $POST['user_mobile'];
                    $options["where"] = "mobile = '".$userId."'" ;
                    $customerDetail = $this->Api_model->getCustomers($options);

                    $options = array();
                   // $booking_no =  $POST['booking_no'];
                    //$options["where"] = "booking_no = '".$booking_no."'" ;
                    if($type=="land"){
                                $data = array(
                                    "site_id" => $POST['site_id'],
                                    //"booking_no" => $POST['booking_no'],
                                    "login_id"=> $customerDetail["data"][0]["login_id"],
                                    "inst_month"=> $POST['inst_month'],
                                    "inst_amount"=> $POST['inst_amount'],
                                    "tot_amount"=> $POST['tot_amount'],                                   
                                    "added_by"=>$this->isAuth->id,
                                    "booked_date"=>date("Y-m-d")
                                );      
                                $table = "land_booking";
                                $id = $this->Api_model->insert_data($table,$data);   
                    }

                    if($type=="chit"){
                                $data = array(
                                    "chit_id" => $POST['chit_id'],
                                   // "booking_no" => $POST['booking_no'],
                                    "login_id"=> $customerDetail["data"][0]["login_id"],
                                    "inst_month"=> $POST['inst_month'],
                                    "inst_amount"=> $POST['inst_amount'],
                                    "tot_amount"=> $POST['tot_amount'],                                    
                                    "added_by"=>$this->isAuth->id,
                                    "booked_date"=>date("Y-m-d")
                                );      
                                $table = "chit_booking";
                                $id = $this->Api_model->insert_data($table,$data);   
                    }

                    if($type=="agar"){
                                $data = array(
                                    "agar_id" => $POST['agar_id'],
                                   // "booking_no" => $POST['booking_no'],
                                    "login_id"=> $customerDetail["data"][0]["login_id"],
                                    "no_tree"=> $POST['no_tree'],
                                    "tree_amount"=> $POST['tree_amount'],                                  
                                    "tot_amount"=> $POST['tot_amount'],
                                    "added_by"=>$this->isAuth->id,
                                    "booked_date"=>date("Y-m-d")
                                );      
                                $table = "agar_booking";
                                $id = $this->Api_model->insert_data($table,$data);   
                    }
                    if($id){
                        $bookin_no = $this->Api_model->update_automaticID($id,$type,$table);
                    }
                    if($id && $bookin_no){
                            $options = array();
                            $userId =  $POST['user_mobile'];
                            $options["where"] = "user_name = '".$userId."'" ;
                            $userDetail = $this->Api_model->getUsers($options);

                            sleep(1);

                            $response = array("STATUS"=>"OK","RESPONSE"=>$userDetail);
                            //print_r($response);
                            $this->set_response($response, REST_Controller::HTTP_OK);
                    }else{
                            $response = array("STATUS"=>"NOK","RESPONSE"=>"No Mobile number found");
                            $this->set_response($response, REST_Controller::HTTP_OK);
                    }
                    
                }else{
                    $response = array("STATUS"=>"NOK","RESPONSE"=>"No Mobile number found");
                    $this->set_response($response, REST_Controller::HTTP_OK);
                }
            }else {
                $response = array("STATUS"=>"NOK","RESPONSE"=>"Not Authorised get this information");
                $this->set_response($response, REST_Controller::HTTP_OK);
            }
    
       }
    }

    public function customerLands_get($id=''){
        if(!empty($this->isAuth)){
            $options = array();
            if($id){
                $return = $this->Api_model->getLandBookingById($id);
            }else{
                $return = $this->Api_model->getLandBookings($options);
            }
            
            $response = array("STATUS"=>"OK","RESPONSE"=>$return);
            $this->set_response($response, REST_Controller::HTTP_OK);
        }          
     }

     public function editCustomerLand_post($id){
        if(!empty($this->isAuth)){
        $POST = $this->post();

              
        $data = array(
            "name" =>  $POST['name'],
            "address" =>  $POST['address']
        );

        $login_id = $POST['login_id'];

        $table = "customers";   
        $cus_id = $this->Api_model->update_data($table,$data, array('login_id'=>$login_id));    

        unset($POST['login_id']);
        unset($POST['name']);
        unset($POST['address']);
       
      //  print_r($POST);

        $table = "land_booking";	
        $idd = $this->Api_model->update_data($table,$POST, array('id'=>$id));
       // print($id);
       sleep(1);
        if($id || $cus_id){
            $this->customerLands_get($id);
        }elseif(!$id && !$cus_id){
            $this->customerLands_get($id);    
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }

    public function customerChits_get($id=''){
        if(!empty($this->isAuth)){
            $options = array();
            if($id){
                $return = $this->Api_model->getChitBookingById($id);
            }else{
                $return = $this->Api_model->getChitBookings($options);
            }
            
            $response = array("STATUS"=>"OK","RESPONSE"=>$return);
            $this->set_response($response, REST_Controller::HTTP_OK);
        }          
     }

     public function editCustomerChit_post($id){
        if(!empty($this->isAuth)){
        $POST = $this->post();
              
        $data = array(
            "name" =>  $POST['name'],
            "address" =>  $POST['address']
        );

        $login_id = $POST['login_id'];

        $table = "customers";   
        $cus_id = $this->Api_model->update_data($table,$data, array('login_id'=>$login_id));    

        unset($POST['login_id']);
        unset($POST['name']);
        unset($POST['address']);
        unset($POST['user_mobile']);
        unset($POST['email_id']);
        
       
       // print_r($POST);

        $table = "chit_booking";	
        $idd = $this->Api_model->update_data($table,$POST, array('id'=>$id));
       // print($id);

       sleep(1);
        if($id || $cus_id){
            $this->customerChits_get($id);
        }elseif(!$id && !$cus_id){
            $this->customerChits_get($id);    
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }

    public function customerAgars_get($id=''){
        if(!empty($this->isAuth)){
            $options = array();
            if($id){
                $return = $this->Api_model->getAgarBookingById($id);
            }else{
                $return = $this->Api_model->getAgarBookings($options);
            }
            
            $response = array("STATUS"=>"OK","RESPONSE"=>$return);
            $this->set_response($response, REST_Controller::HTTP_OK);
        }          
     }

     public function editCustomerAgar_post($id){
        if(!empty($this->isAuth)){
        $POST = $this->post();
              
        $data = array(
            "name" =>  $POST['name'],
            "address" =>  $POST['address']
        );

        $login_id = $POST['login_id'];

        $table = "customers";   
        $cus_id = $this->Api_model->update_data($table,$data, array('login_id'=>$login_id));    

        unset($POST['login_id']);
        unset($POST['name']);
        unset($POST['address']);
        unset($POST['user_mobile']);
        unset($POST['email_id']);
        
       
       // print_r($POST);

        $table = "agar_booking";	
        $idd = $this->Api_model->update_data($table,$POST, array('id'=>$id));
       // print($id);
       sleep(1);
        if($id || $cus_id){
            $this->customerAgars_get($id);
        }elseif(!$id && !$cus_id){
            $this->customerAgars_get($id);    
        }else{
            $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
            $this->set_response($response, REST_Controller::HTTP_OK);
        }
        
       } 
    }


    public function getUsers_get($userId=""){
       if(!empty($this->isAuth)){
            $options = array();
            if(!empty($userId) && is_numeric($userId)){
                if(strlen($userId) == 10){
                    $options["where"] = "user_name = '".$userId."'" ;
                }else{
                    $options["where"] = "id = ".$userId ;
                }
            }
            $return = $this->Api_model->getUsers($options);
            $response = array("STATUS"=>"OK","RESPONSE"=>$return);
            $this->set_response($response, REST_Controller::HTTP_OK);
       } 

    }

    public function addTransaction_post($type){
        if(!empty($this->isAuth)){
            $POST = $this->post();          
            $data = array(
                            "login_id"=>$POST['login_id'],
                            "inst_month"=>$POST['inst_month'],
                            "inst_amount"=>$POST['inst_amount'],
                            "added_by"=>$this->isAuth->id,
                    );
            
            $data[$type."_id"] = $POST['type_id'];
            $table = $type."_installments";
            /*if($type == "agar"){
                $data["agar_id"] = $POST['type_id'];
                $table = "agar_installments";
            }elseif($type == "chit"){
                $data["chit_id"] = $POST['type_id'];
                $table = "chit_installments";
            }else{
                $data["land_id"] = $POST['type_id'];
                $table = "chit_installments";
            }*/
            $id = $this->Api_model->insert_data($table,$data);
            if($id){
                $this->getTransaction_get($type);
                $where = array("id"=>$POST['type_id']);
                $this->updateBookings($type,$POST['type_id']);
            }else{
                $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
                $this->set_response($response, REST_Controller::HTTP_OK);
            }
       }
    }

    public function updateBookings($type,$id){
        if(!empty($this->isAuth)){
            $POST = $this->post();  
            $detail = $this->getBooking($type,$id);
            $data = array(
                            "paid_months"=>$detail["data"][0]['paid_months'],
                            "paid_amount"=>$detail["data"][0]['paid_amount'],
                            "balance_months"=>$detail["data"][0]['balance_months'],
                            "balance_amount"=>$detail["data"][0]['balance_amount'],
                    );
            $table = $type."_booking";
            $id = $this->Api_model->update_data($table,$data, array("id"=>$id));
            return $id;        
       }
    }

    public function getTransaction_get($type,$id=""){
        if(!empty($this->isAuth)){
            $options = array();
            if($id){
                $options["where"] = "i.inst_id = ".$id ;
            }
           $return = $this->Api_model->getTransaction($type,$options);
           $response = array("STATUS"=>"OK","RESPONSE"=>$return);
           $this->set_response($response, REST_Controller::HTTP_OK);
       }
    }

    public function getBookings_get($type,$id=""){
        if(!empty($this->isAuth)){
            $options = array();
            if($type == "land"){
                $id_column = "site_id";
            }else if($type == "chit"){
                $id_column = "chit_id";
            }else{
                $id_column = "agar_id";
            }
            
            if($id){
                $options["where"] = "b.id = ".$id ;
            }
            if($this->userType == 3){
                $options["where"] = "b.login_id = ".$this->isAuth->id ;
            }
           $return = $this->Api_model->getBooking($type,$options);
           $response = array("STATUS"=>"OK","RESPONSE"=>$return);
           $this->set_response($response, REST_Controller::HTTP_OK);
       }
    }
     public function editTransaction_post($type,$id=""){
        if(!empty($this->isAuth)){
            $POST = $this->post();
             $data = array(
                            "login_id"=>$POST['login_id'],
                            "inst_month"=>$POST['inst_month'],
                            "inst_amount"=>$POST['inst_amount'],
                            "added_by"=>$this->isAuth->id,
                    );
            $data[$type."_id"] = $POST['type_id'];
            $table = $type."_installments";
            
            $id = $this->Api_model->update_data($table,$data, array("inst_id"=>$id));
            if($id){
                $this->getTransaction_get($type);
            }else{
                $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
                $this->set_response($response, REST_Controller::HTTP_OK);
            }
        
       } 
    } 
   
    public function deleteTransaction_post($type,$id=""){
        if(!empty($this->isAuth)){

            $options["where"] = "i.inst_id = ".$id ;

            $getDetail = $this->Api_model->getTransaction($type,$options);
            $type_id = $getDetail["data"][0][$type."_id"];
            $table = $type."_installments";
            $data = array("is_delete"=>1,"deleted_by" =>$this->isAuth->id);
            $id = $this->Api_model->update_data($table,$data, array("inst_id"=>$id));
            if($id){
                $this->updateBookings($type,$type_id);
                $response = array("STATUS"=>"OK","RESPONSE"=>"Data Deleted");
                $this->set_response($response, REST_Controller::HTTP_OK);
            }else{
                $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to Deleta");
                $this->set_response($response, REST_Controller::HTTP_OK);
            }
       } 
    }


    /** Employee master Start **/   
   
    public function employees_get($id=""){
        if(!empty($this->isAuth)){
            $options = array();
            if($id){
                $options["where"] = "emp_id = ".$id ;
            }
            $return = $this->Api_model->getEmployees($options);
            $response = array("STATUS"=>"OK","RESPONSE"=>$return);
            $this->set_response($response, REST_Controller::HTTP_OK);
        } 
         
     }
     
     public function addEmployee_post(){
        if(!empty($this->isAuth)){
             $POST = $this->post();
             
        if(isset($POST['mobile']) && !empty($POST['mobile'])){
            $options = array();
            $userId =  $POST['mobile'];
            $options["where"] = "user_name = '".$userId."'" ;
            $userDetail = $this->Api_model->getUsers($options);
            
            //print_r($userDetail);
            if(!$userDetail["count"]){
                $data = array(
                            "user_name" => $POST['mobile'],
                            "user_password" => md5($POST['mobile']),
                            "user_mobile" => $POST['mobile'],
                            "user_email"=>(isset($POST['email']) && !empty($POST['email']) ? $POST['email']: ""),
                            "user_type"=>2,
                        );      
                $table = "user_login";
                $id = $this->Api_model->insert_data($table,$data);
                if($id){
                        $userId =  $POST['mobile'];
                        $options["where"] = "id = ".$id;
                        $userDetail = $this->Api_model->getUsers($options);
                        
                }else{
                    $response = array("STATUS"=>"NOK","RESPONSE"=>"Registration Failed");
                    $this->set_response($response, REST_Controller::HTTP_OK);
                }
            
            $options = array();
            $userId =  $POST['mobile'];
            $options["where"] = "mobile = '".$userId."'" ;
            $customerDetail = $this->Api_model->getCustomers($options);
           
            if(!$customerDetail["count"]){
                $data = array(
                            "login_id" => $userDetail["data"][0]["id"],
                            "name" => $POST['name'],
                            "mobile" => $POST['mobile'],
                            "email_id"=>(isset($POST['email']) && !empty($POST['email']) ? $POST['email']: ""),
                            "address"=>$POST['address'],
                            "added_by"=>$this->isAuth->id,
                            "type"=>3,
                        );      
                $table = "customers";
                $id = $this->Api_model->insert_data($table,$data);
            
            $options = array();
            $userId =  $POST['mobile'];
            $options["where"] = "mobile = '".$userId."'" ;
            $customerDetail = $this->Api_model->getCustomers($options);
         $data = array(
 
                         //"emp_pin"=>$POST['employeeId'],
                         "name" => $POST['name'],
                         "gender"=> $POST['gender'],
                         "login_id"=> $customerDetail["data"][0]["login_id"],
                         "dob"=> $POST['dob'],
                         "mobile"=>$POST['mobile'],
                         "email"=>$POST['email'],
                         "address"=>$POST['address'],
                         "city"=>$POST['city'],
                         "state" => $POST['state'],
                         "country"=> $POST['country'],
                         "education"=> $POST['education'],
                         "maritial_status"=>$POST['maritalStatus'],
                         "id_proof"=>$POST['idProof']
                         
                 );
         $table = "employees";
         $id = $this->Api_model->insert_data($table,$data);
         if($id){
            $bookin_no = $this->Api_model->update_automaticID($id,"employee",$table);
         }
         if($id && $bookin_no){
             $this->employees_get($id);
         }else{
             $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed");
             $this->set_response($response, REST_Controller::HTTP_OK);
         
            }
        
       }
     } else{
        $response = array("STATUS"=>"NOK","RESPONSE"=>"Mobile number already exist");
        $this->set_response($response, REST_Controller::HTTP_OK);
}
     }
    }
}
     
     public function editEmployee_post($id){
         if(!empty($this->isAuth)){
         $POST = $this->post();
        // if(isset($POST['mobile']) && !empty($POST['mobile'])){
        //     $options = array();
        //     $userId =  $POST['mobile'];
        //     $options["where"] = "user_name = '".$userId."'" ;
        //     $userDetail = $this->Api_model->getUsers($options);
        //     if(!$userDetail["count"]){
        //         $data = array(
        //                     "user_name" => $POST['mobile'],
        //                     "user_password" => md5($POST['mobile']),
        //                     "user_mobile" => $POST['mobile'],
        //                     "user_email"=>(isset($POST['email']) && !empty($POST['email']) ? $POST['email']: ""),
        //                     "user_type"=>3,
        //                 );      
        //         $table = "user_login";
        //         $id = $this->Api_model->insert_data($table,$data);
        //         if($id){
        //                 $userId =  $POST['mobile'];
        //                 $options["where"] = "id = ".$id;
        //                 $userDetail = $this->Api_model->getUsers($options);
                        
        //         }else{
        //             $response = array("STATUS"=>"NOK","RESPONSE"=>"Registration Failed");
        //             $this->set_response($response, REST_Controller::HTTP_OK);
        //         }
        //     }
        //     $options = array();
        //     $userId =  $POST['mobile'];
        //     $options["where"] = "mobile = '".$userId."'" ;
        //     $customerDetail = $this->Api_model->getCustomers($options);
        //     if($type == "land"){
        //         $t_id= 1;
        //     }else if($type == "chit"){
        //         $t_id= 2;
        //     }else{
        //         $t_id= 3;
        //     }
        //     if(!$customerDetail["count"]){
        //         $data = array(
        //                     "login_id" => $userDetail["data"][0]["id"],
        //                     "name" => $POST['name'],
        //                     "mobile" => $POST['mobile'],
        //                     "email_id"=>(isset($POST['email']) && !empty($POST['email']) ? $POST['email']: ""),
        //                     "address"=>$POST['address'],
        //                     "added_by"=>$this->isAuth->id,
        //                     "type"=>$t_id,
        //                 );      
        //         $table = "customers";
        //         $id = $this->Api_model->insert_data($table,$data);
        //     }
        //     $options = array();
        //     $userId =  $POST['mobile'];
        //     $options["where"] = "mobile = '".$userId."'" ;
        //     $customerDetail = $this->Api_model->getCustomers($options);
         $data = array(
            //"emp_pin"=>$POST['employeeId'],
            "name" => $POST['name'],
            "gender"=> $POST['gender'],
            "dob"=> $POST['dob'],
            "mobile"=>$POST['mobile'],
            "email"=>$POST['email'],
            "address"=>$POST['address'],
            "city"=>$POST['city'],
            "state" => $POST['state'],
            "country"=> $POST['country'],
            "education"=> $POST['education'],
            "maritial_status"=>$POST['maritalStatus'],
            "id_proof"=>$POST['idProof']
                         
                 );
         $table = "employees";  
         $id = $this->Api_model->update_data($table,$data, array('emp_id'=>$id));
         if($id){
             $this->employees_get($id);
         }else{
             $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to update");
             $this->set_response($response, REST_Controller::HTTP_OK);
         }
        }
     //   } 
     }
     
    
     public function deleteEmployee_post($id){
         if(!empty($this->isAuth)){
         $table = "employees";  
         $id = $this->Api_model->delete_data($table, array('emp_id'=>$id));
         if($id){
             $response = array("STATUS"=>"OK","RESPONSE"=>"Data Deleted");
             $this->set_response($response, REST_Controller::HTTP_OK);
         }else{
             $response = array("STATUS"=>"NOK","RESPONSE"=>"Data Failed to Deleta");
             $this->set_response($response, REST_Controller::HTTP_OK);
         }
         
        } 
     }
       /** Employee master End **/   
    public function getMyTransaction(){

    }
    public function getBookingDetails_get($type,$id=""){
        if(!empty($this->isAuth)){
            $options = array();
            if($id){
                $options["where"] = "i.".$type."_id = ".$id." and is_delete != 1"  ;
            }
           $return = $this->Api_model->getTransaction($type,$options);
           $response = array("STATUS"=>"OK","RESPONSE"=>$return);
           $this->set_response($response, REST_Controller::HTTP_OK);
       }
    }
    public function getBooking($type,$id=""){
        $options = array();
            if($type == "land"){
                $id_column = "site_id";
            }else if($type == "chit"){
                $id_column = "chit_id";
            }else{
                $id_column = "agar_id";
            }
            
            if($id){
                $options["where"] = "b.id = ".$id ;
            }
           $return = $this->Api_model->getBooking($type,$options);
           return $return;
    }

        public function customerReport_post($type,$id=''){
        if(!empty($this->isAuth)){
            $POST = $this->post();
         //   print_r($POST); exit;
            $options = array();
            if($type == "all"){
                $table = "";
            }else if($type == "paid"){
                $options["where"] = "cb.balance_amount = 0";
                $table = "";
            }

            if(!empty($POST["fromDateCBR"])  && empty($POST["toDateCBR"])){
                $options["where"] = "cb.booked_date >= "."'".$POST['fromDateCBR']."'";
                $table = "";
            }else if (!empty($POST["toDateCBR"]) && empty($POST["fromDateCBR"])) {
                $options["where"] = "cb.booked_date <= "."'".$POST['toDateCBR']."'";
                 $table = "";
            }else if(!empty($POST["toDateCBR"]) && !empty($POST["fromDateCBR"])){
               $options["where"] = "cb.booked_date >= "."'".$POST['fromDateCBR']."'"." and "."cb.booked_date <= "."'".$POST['toDateCBR']."'";
                 $table = "";
            }
           if(isset($POST["typeCBR"]) && $POST["typeCBR"] != ""){
            if ($POST["typeCBR"] == 1) {
                $table = "land_booking";
            }else if($POST["typeCBR"] == 2){
                $table = "agar_booking";
            }else if($POST["typeCBR"] == 3){
                $table = "chit_booking";
            }
      }
                $return = $this->Api_model->getcustomerReport($options,$table);
            
            
            $response = array("STATUS"=>"OK","RESPONSE"=>$return);
            $this->set_response($response, REST_Controller::HTTP_OK);
        }          
     }

     public function emploeeReport_post($type,$id=''){
        if(!empty($this->isAuth)){
            $POST = $this->post();
         //  print_r($POST); 
            $options = array();
            if($type == "all"){
                $table = "";
                $from = "";
                $to = "";
            }else if($type == "paid"){
                $options["where"] = "cb.balance_amount = 0";
                $table = "";
                
            }
           if(!empty($POST["fromDateCBR"])  && empty($POST["toDateCBR"])){
                 $options["where"] = "cb.booked_date >= "."'".$POST['fromDateCBR']."'";
                 $table = "";
             }else if (!empty($POST["toDateCBR"]) && empty($POST["fromDateCBR"])) {
                 $options["where"] = "cb.booked_date <= "."'".$POST['toDateCBR']."'";
                  $table = "";
             }else if(!empty($POST["toDateCBR"]) && !empty($POST["fromDateCBR"])){
                $options["where"] = "cb.booked_date >= "."'".$POST['fromDateCBR']."'"." and "."cb.booked_date <= "."'".$POST['toDateCBR']."'";
                  $table = "";
             }
           if(isset($POST["typeCBR"]) && $POST["typeCBR"] != ""){
            if ($POST["typeCBR"] == 1) {
                $table = "land_booking";
            }else if($POST["typeCBR"] == 2){
                $table = "agar_booking";
            }else if($POST["typeCBR"] == 3){
                $table = "chit_booking";
            }
      }
          
        //   print_r($options); exit;
            $return = $this->Api_model->getemployerReport($options,$table);
            
            
            $response = array("STATUS"=>"OK","RESPONSE"=>$return);
            $this->set_response($response, REST_Controller::HTTP_OK);
        }          
     }

     
}
