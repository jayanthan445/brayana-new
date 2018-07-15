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
        //print_r($data);exit;
          //$this->db->where($where);
          $this->db->update($table,$data,$where);
          //debug_last_query();exit;
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
            $auth = "";
            if(isset($headers['auth'])){
                $auth = $headers['auth'];
            }else if(isset($headers['Auth'])){
                 $auth = $headers['Auth'];
            }
            if((array_key_exists('auth', $headers) || array_key_exists('Auth', $headers)) && !empty($auth)) {
                $decodedToken = AUTHORIZATION::validateToken($auth);
                
                if ($decodedToken != false) {
                    
                    return $decodedToken;
                }
            }
            return false;
        }
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

                        $customerId = $customer["customer_id"];
                        $options["where"] = "customer_id = ".$customerId ;
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
            $query = $query = "SELECT * FROM land_booking";
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

        public function getChitBookings($options = array()){
            $query = $query = "SELECT * FROM chit_booking";
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

        public function getAgarBookings($options = array()){
            $query = $query = "SELECT * FROM agar_booking";
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

}