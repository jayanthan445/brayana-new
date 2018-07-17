<?php
class Api_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}
        

        public function insert_data($table,$data)
        {
              //print_r($data);exit;
              $this->db->insert($table,$data);

                $id = $this->db->insert_id();
                return $id;

        }
        
        public function update_data($table,$data,$where)
        {

          $this->db->update($table,$data,$where);
          $afftectedRows = $this->db->affected_rows();
          return $afftectedRows;
        }

        public function insert_update($table,$data,$options=array()){
            $query = $query = "SELECT * FROM ".$table;
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
              $where[] = $options['where'];
            }
              $count =0;
             if(!empty($where)){
               $query_where =" where ". implode(" and ", $where);
               $query .= $query_where;
               $result = $this->db->query($query);
                $count = $result->num_rows();
             }
            
            
            if($count>0){
                $id = $this->update_data($table,$data,implode(" and ", $where));
            }else{
                $id = $this->insert_data($table,$data);
            }   
            return $id;
        }
        public function delete_data($table,$where)
        {
        //print_r($data);exit;
          //$this->db->where($where);
          $this->db->delete($table,$where);
          //debug_last_query();exit;
          //$afftectedRows = $this->db->affected_rows();
          return true;
        }
         public function record_count($table) {
              return $this->db->count_all($table);
          }

          public function update_automaticID($id,$type,$table){
                $id = str_pad($id,5,0,STR_PAD_LEFT); 
                $auto_id = "";
                if($type == "land"){
                    $auto_id = "BGL".$id;
                    $data = array("booking_no "=>$auto_id );
                    $where = array('id'=>$id);
                }else if($type == "agar"){
                    $auto_id = "BGW".$id;
                    $data = array("booking_no "=>$auto_id );
                    $where = array('id'=>$id);
                }else if($type == "chit"){
                    $auto_id = "BGF".$id;
                    $data = array("booking_no "=>$auto_id );
                    $where = array('id'=>$id);
                }else if($type == "employee"){
                    $auto_id = "BGE".$id;
                    $data = array("emp_pin "=>$auto_id );
                    $where = array('emp_id'=>$id);
                }
                if($auto_id != ""){

                    $this->db->update($table,$data,$where);
                    $afftectedRows = $this->db->affected_rows();
                    return $afftectedRows;  
                }
                return false;
                

          }

		// Read data using username and password
	public function login($data) {

		$condition = "user_name =" . "'" . $data['username'] . "' AND " . "user_password =" . "'" . md5($data['password']) . "'";
		$this->db->select('*');
		$this->db->from('user_login');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() == 1) {
			return $this->Api_model->read_user_information($data['username']);
		} else {
			return false;
		}
	}

		// Read data from database to show data in admin page
	public function read_user_information($username) {

		$condition = "user_name =" . "'" . $username . "'";
		$this->db->select('*');
		$this->db->from('user_login');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() == 1) {
			return $query->result();
		} else {
			return false;
		}
	}
        
        public function validateToken(){
            
            $headers = $this->input->request_headers();
            $auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJlbWFpbCI6bnVsbCwibW9iaWxlIjoiOTAwMzUwMjcxOSIsInR5cGUiOiIxIn0.NcrGhOr9Bvu99q5eEGcKkJqnjs81YodTbYpTyHrasx0";
            if(!empty($auth)) {
                $decodedToken = AUTHORIZATION::validateToken($auth);
                
                if ($decodedToken != false) {
                    
                    return $decodedToken;
                }
            }
            /*if(isset($headers['authorization'])){
                $auth = $headers['authorization'];
            }else if(isset($headers['Authorization'])){
                 $auth = $headers['Authorization'];
            }
            if((array_key_exists('authorization', $headers) || array_key_exists('Authorization', $headers)) && !empty($auth)) {
                $decodedToken = AUTHORIZATION::validateToken($auth);
                
                if ($decodedToken != false) {
                    
                    return $decodedToken;
                }
            }*/
            return false;
        }
        /* public function validateToken($post){
            print_r($post);
            if(!empty( $post["auth"])) {
                $decodedToken = AUTHORIZATION::validateToken($post["auth"]);
                
                if ($decodedToken != false) {
                    
                    return $decodedToken;
                }
            }
            return false;
        }*/
        /*** Land**/
        public function getLands($options = array()){
            $query = $query = "SELECT * FROM land_master";
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }

             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
            $query .= " order by site_name ASC"; 
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
            return $response;    
        }

        /*** Chit**/
        public function getChits($options = array()){
            $query = $query = "SELECT * FROM chit_master";
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }

             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
            $query .= " order by fund_type ASC"; 
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
            return $response;    
        }



        public function getEmployees($options = array()){
          $query = $query = "SELECT * FROM employees";
          $where = array();
          if(isset($options['where']) && !empty($options['where']))
          {
           $where[] = $options['where'];
          }

           if(!empty($where)){
             $query .=" where ". implode(" and ", $where);
           }
          $query .= " order by emp_id ASC"; 
          if(isset($options['offset']))
          {
            $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
            $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
          } 
          $result = $this->db->query($query);
          $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
          return $response;    
      }
        /*** Agar**/
        public function getAgars($options = array()){
            $query = $query = "SELECT * FROM tree_master";
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }

             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
            $query .= " order by site_name ASC"; 
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
            return $response;    
        }

        /*** Customer**/
        public function getUsers($options = array()){
            $query = $query = "SELECT id,user_name,user_email,user_mobile,user_type FROM user_login";
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }

             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
            $query .= " order by user_name ASC"; 
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $users_list = $result->result_array();
            $user_count = $result->num_rows();
            if($user_count > 0){
                foreach ($users_list as $key=>$users) {
                    if($users["user_type"] == 3){
                        $loginId = $users["id"];
                        $options["where"] = "login_id = ".$loginId ;
                        $customer_detail = $this->getCustomers($options);
                        $users_list[$key]["customer_detail"] = $customer_detail;
                    }
                }  
            }
            

            $response = array('data'=>$users_list,'count'=>$user_count);
            return $response;    
        } 

        public function getCustomers($options = array()){
            $query = $query = "SELECT * FROM customers";
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }

             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
            $query .= " order by name ASC"; 
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $customer_list = $result->result_array();
            $customer_count = $result->num_rows();
            if($customer_count > 0){
                foreach ($customer_list as $key=>$customer) {

                        $customerId = $customer["login_id"];
                        $options["where"] = "login_id = ".$customerId ;
                        $customer_detail = $this->getLandBookings($options);
                        $customer_list[$key]["detail"]["land"] = $customer_detail;

                        $customer_detail = $this->getChitBookings($options);
                        $customer_list[$key]["detail"]["chit"] = $customer_detail;

                        $customer_detail = $this->getAgarBookings($options);
                        $customer_list[$key]["detail"]["agar"] = $customer_detail;

                }  
            }
            

            $response = array('data'=>$customer_list,'count'=>$customer_count);
            return $response;    
        }

        public function getLandBookings($options = array()){
              if(empty($options)){
                  $query = "SELECT lb.*,lm.site_name,lm.survey_no,lm.area,lm.city,c.* FROM land_booking as lb JOIN land_master as lm ON (lb.site_id = lm.site_id) JOIN customers as c ON (lb.login_id = c.login_id)";
              }else{
                $query = "SELECT * FROM land_booking";
              }
              
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }

             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
             $query .= " order by booking_no ASC"; 
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
            return $response;    
        }
        public function getcustomerReport($options = array(),$table){

        
          $detail = array();
          if(empty($table)){
          $tab = array("chit_booking","agar_booking","land_booking");
          $i = 1;
          for ($i=0; $i <=2 ; $i++) { 
           
            $query = "SELECT * FROM"." ".$tab[$i]." as cb JOIN customers as cm ON (cb.login_id = cm.login_id)";
             $where = array();
          if(isset($options['where']) && !empty($options['where']))
          {
           $where[] = $options['where'];
          }
           if(!empty($where)){
             $query .=" where ". implode(" and ", $where);
           }
            $result = $this->db->query($query);
            $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
    
                for ($k=0; $k <=$result->num_rows() - 1 ; $k++) { 
                
                  array_push($detail,$response['data'][$k]);
                }

          }
        }else{
          $query = "SELECT * FROM"." ".$table." as cb JOIN customers as cm ON (cb.login_id = cm.login_id)";
          //$result = $this->db->query($query);
           // $response = array('data'=>$result->result_array(),'count'=>count($result->result_array()));
          //  print_r($result->result_array()); exit;
          $result = $this->db->query($query);
          $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
          return $response; 

        }
        
          // $query = $query = "SELECT * FROM chit_booking";
          // $where = array();
          // if(isset($options['where']) && !empty($options['where']))
          // {
          //  $where[] = $options['where'];
          // }

          //  if(!empty($where)){
          //    $query .=" where ". implode(" and ", $where);
          //  }
          // $query .= " order by name ASC"; 

          // $result = $this->db->query($query);
          //   $customer_list = $result->result_array();
          //   $customer_count = $result->num_rows();
            // if($customer_count > 0){
            //     foreach ($customer_list as $key=>$customer) {

            //             $customerId = $customer["login_id"];
            //             $options["where"] = "login_id = ".$customerId ;
            //             $customer_detail = $this->getLandBookings($options);
            //             $customer_list[$key]["land"]["detail"] = $customer_detail;

            //             $customer_detail = $this->getChitBookings($options);
            //             $customer_list[$key]["chit"]["detail"] = $customer_detail;
                       

            //             $customer_detail = $this->getAgarBookings($options);
            //             $customer_list[$key]["agar"]["detail"] = $customer_detail;
                   

            //           // $key = array_combine($customer_list[$key]["chit"]["detail"]["data"]["data"],$customer_list[$key]["land"]["detail"]["data"]["data"]);
            //           // print_r($a); exit;  //   $a = array_push($a,$customer_list[$key]["chit"]["detail"]);


            //     }  
            // }

          //  print_r($a); exit;
       $response = array('data'=>$detail,'count'=>count($detail));
            return $response;    
    }

    public function getemployerReport($options = array(),$table){

   //    print_r($options); print_r($table); exit;
      $detail = array();
      if(empty($table)){
      $tab = array("chit_booking","agar_booking","land_booking");
      $i = 1;
      for ($i=0; $i <=2 ; $i++) { 
       
        $query = "SELECT cm.emp_pin,cm.name as emp_name,cb.booking_no,c.name as cust_name,cm.mobile as emp_mobile,c.type,cb.tot_amount FROM"." ".$tab[$i]." as cb JOIN employees as cm ON (cb.added_by = cm.login_id) JOIN customers as c ON (cb.login_id = c.login_id)";
         $where = array();
      if(isset($options['where']) && !empty($options['where']))
      {
       $where[] = $options['where'];
      }
       if(!empty($where)){
         $query .=" where ". implode(" and ", $where);
       }
      //  if(!empty($from)){
      //   $query .=" where ". implode(" and ", $from);
      // }
      // if(!empty($to)){
      //   // if (condition) {
      //   //   # code...
      //   // }
      //   $query .=" where ". implode(" and ", $to);
      // }
     //print_r($query); 
        $result = $this->db->query($query);
        $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());

            for ($k=0; $k <=$result->num_rows() - 1 ; $k++) { 
            
              array_push($detail,$response['data'][$k]);
            }

      }
    }else{
      $query = "SELECT cm.emp_pin,cm.name as emp_name,cb.booking_no,c.name as cust_name,cm.mobile as emp_mobile,c.type,cb.tot_amount FROM"." ".$table." as cb JOIN employees as cm ON (cb.added_by = cm.login_id) JOIN customers as c ON (cb.login_id = c.login_id)";

    // print_r($query); exit; 
      $result = $this->db->query($query);
      $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
      return $response; 

    }
    
   $response = array('data'=>$detail,'count'=>count($detail));
        return $response;    
}

    public function getChitBookingReport($options = array()){
      if(empty($options)){
           $query = "SELECT cb.*,cm.fund_type,c.* FROM chit_booking as cb JOIN chit_master as cm ON (cb.chit_id = cm.chit_id) JOIN customers as c ON (cb.login_id = c.login_id)";
        }else{
          $query = "SELECT * FROM chit_booking";
        }
      
      $where = array();
      if(isset($options['where']) && !empty($options['where']))
      {
       $where[] = $options['where'];
      }

       if(!empty($where)){
         $query .=" where ". implode(" and ", $where);
       }
      $query .= " order by booking_no ASC"; 
      if(isset($options['offset']))
      {
        $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
        $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
      } 
      $result = $this->db->query($query);
      $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
      return $response;    
  }

        public function getLandBookingById($id = ''){
         $query = "SELECT lb.*,lm.site_name,lm.survey_no,lm.area,lm.city,c.* FROM land_booking as lb JOIN land_master as lm ON (lb.site_id = lm.site_id) JOIN customers as c ON (lb.login_id = c.login_id) WHERE lb.id=$id";          
       //  print($query);

        $result = $this->db->query($query);
        $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
        return $response;    
    }

        public function getChitBookings($options = array()){
            if(empty($options)){
                 $query = "SELECT cb.*,cm.fund_type,c.* FROM chit_booking as cb JOIN chit_master as cm ON (cb.chit_id = cm.chit_id) JOIN customers as c ON (cb.login_id = c.login_id)";
              }else{
                $query = "SELECT * FROM chit_booking";
              }
            
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }

             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
            $query .= " order by booking_no ASC"; 
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
            return $response;    
        }

        public function getChitBookingById($id = ''){
          $query = "SELECT lb.*,lm.fund_type,c.*,c.email_id ,c.mobile as user_mobile FROM chit_booking as lb JOIN chit_master as lm ON (lb.chit_id = lm.chit_id) JOIN customers as c ON (lb.login_id = c.login_id) WHERE lb.id=$id";          
        //  print($query);
 
         $result = $this->db->query($query);
         $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
         return $response;    
     }

        public function getAgarBookings($options = array()){
          if(empty($options)){
                 $query = $query = "SELECT * FROM agar_booking as ab JOIN tree_master as tm ON (ab.agar_id = tm.site_id) JOIN customers as c ON (ab.login_id = c.login_id)";
              }else{
                $query = "SELECT * FROM agar_booking";
              }
            
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }

             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
            $query .= " order by booking_no ASC"; 
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
            return $response;    
        }

        public function getAgarBookingById($id = ''){
          $query = "SELECT ab.*,tm.site_name,c.* FROM agar_booking as ab JOIN tree_master as tm ON (ab.agar_id = tm.site_id) JOIN customers as c ON (ab.login_id = c.login_id) WHERE ab.id=$id";          
        //  print($query);
 
         $result = $this->db->query($query);
         $response = array('data'=>$result->result_array(),'count'=>$result->num_rows());
         return $response;    
     }

        /*Transaction */
        public function getTransaction($type,$options = array()){
          $cols = "";
           if($type != "agar"){
              $cols = " b.inst_month as total_months,b.inst_amount as amount_per_month,b.booked_date, ";
           }
            $query = "SELECT i.*,b.booking_no,".$cols." c.* FROM ".$type."_installments i ";
            $query .= "JOIN ".$type."_booking b ON (i.".$type."_id = b.id) ";
            if($type == "agar"){
              $query .= "JOIN tree_master m ON (b.agar_id = m.site_id) ";
            }else if($type == "land"){
              $query .= "JOIN land_master m ON (b.site_id = m.site_id) ";
            }else if($type == "chit"){
              $query .= "JOIN chit_master m ON (b.chit_id = m.chit_id) ";
            }
            $query .= " JOIN customers c ON (b.login_id = c.login_id) ";
            $where = array();
            if(isset($options['where']) && !empty($options['where']))
            {
             $where[] = $options['where'];
            }
             if(!empty($where)){
               $query .=" where ". implode(" and ", $where);
             }
            if(isset($options['offset']))
            {
              $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
              $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
            } 
            $result = $this->db->query($query);
            $list = $result->result_array();
            $count = $result->num_rows();
            
            if($type != "agar"){
              $count = $list[0]["total_months"];
                for($i=0;$i<$count;$i++){
                $booked_ym = date("F-Y",strtotime($list[0]["booked_date"]." +".$i." Month "));
                if(isset($list[$i])){
                    $list[$i]["date"] = date("d/m/Y",strtotime($list[$i]["datetime"]));
                    $list[$i]["status"] ="PAID";
                  }else{
                      $list[$i]["inst_amount"] =  $list[0]["amount_per_month"];
                       $list[$i]["status"] ="UNPAID";
                       $list[$i]["date"] = "";
                       $list[$i]["name"] = $list[0]["name"];
                  }
                  $list[$i]["inst_month"] =  $booked_ym;
                   
              }
            }else{
                for($i=0;$i<$count;$i++){
                if(isset($list[$i])){
                    $list[$i]["date"] = date("d/m/Y",strtotime($list[$i]["datetime"]));
                    $list[$i]["inst_month"] = date("F-Y",strtotime($list[$i]["datetime"]));
                    $list[$i]["status"] ="PAID";
                  }
                   
              }
            }
            
            $response = array('data'=>$list,'count'=>$count);
            return $response;    
                
        }

        public function getBooking($type,$options = array()){
          $column = "b.*,c.* ";
          if($type == "agar"){
              $column  .= ",m.site_name ";
            }else if($type == "chit"){
              $column  .= ",m.fund_type ";
            }else if($type == "land"){
              $column  .= ",m.site_name ";
            }
          $query = "SELECT ".$column." FROM ".$type."_booking b JOIN customers c ON (b.login_id = c.login_id) ";
          if($type == "agar"){
              $query .= "JOIN tree_master m ON (b.agar_id = m.site_id) ";
            }else if($type == "land"){
              $query .= "JOIN land_master m ON (b.site_id = m.site_id) ";
            }else if($type == "chit"){
              $query .= "JOIN chit_master m ON (b.chit_id = m.chit_id) ";
            }
          $where = array();
          if(isset($options['where']) && !empty($options['where']))
          {
           $where[] = $options['where'];
          }

           if(!empty($where)){
             $query .=" where ". implode(" and ", $where);
           }
          if(isset($options['offset']))
          {
            $options['offset'] = !empty($options['offset']) ? $options['offset'] : 0;
            $query .=" LIMIT ".$options['offset'].",".$options['limit']."";
          } 
          $result = $this->db->query($query);
          $count = $result->num_rows();
          $lists = $result->result_array();
          if($count > 0){
              foreach($lists as $key=>$value){
                $calc = $this->calculateBookingDetails($type,$value["id"]);
                $lists[$key]["calc"] = $calc;
                $paid_amount = ($calc["paid_amount"] == null ? 0 : $calc["paid_amount"]);
                $paid_months = ($calc["paid_months"] == null ? 0 : $calc["paid_months"]);
                $lists[$key]["paid_amount"] =  $paid_amount;
                $lists[$key]["paid_months"] = $calc["paid_months"];
                $lists[$key]["balance_amount"] = $value["tot_amount"] - $paid_amount;
                if(isset($value["inst_month"])){
                      $lists[$key]["balance_months"] = $value["inst_month"] - $paid_months;
                }
                
              }
          }
          $response = array('data'=>$lists,'count'=>$result->num_rows());
          return $response;    
      }

      public function calculateBookingDetails($type,$id){
        $query = "SELECT SUM(inst_amount) paid_amount,count(inst_id) paid_months FROM ".$type."_installments i WHERE ".$type."_id=".$id." and is_delete =0";
        $result = $this->db->query($query);
        $response =$result->result_array();
        return $response[0];
    }
}