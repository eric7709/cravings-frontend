// package com.example.demo.auth;

// import java.time.LocalDateTime;

// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @AllArgsConstructor
// @NoArgsConstructor
// @Data
// @EntityListeners(AuditingEntityListener.class)
// public class Account {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotNull
//     @NotBlank
//     private String firstName;

//     @NotNull
//     @NotBlank
//     private String lastName;

//     @Column(unique = true, nullable = false)
//     private String email;

//     @Column(unique = true, nullable = false)
//     private String phoneNumber;

//     private String password;

//     @Enumerated(EnumType.STRING)
//     private Role role;

//     @CreatedDate
//     private LocalDateTime createdAt;

//     @LastModifiedDate
//     private LocalDateTime updatedAt;
// }


// package com.example.demo.category;

// import java.time.LocalDateTime;
// import java.util.List;

// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import com.example.demo.menuItem.MenuItem;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EntityListeners;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.OneToMany;
// import jakarta.validation.constraints.NotNull;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @EntityListeners(AuditingEntityListener.class)
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class Category {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotNull
//     @Column(nullable = false)
//     private String name;

//     @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
//     private List<MenuItem> menuItems;

//     private String description;

//     @CreatedDate
//     private LocalDateTime createdAt;

//     @LastModifiedDate
//     private LocalDateTime updatedAt;

// }


// package com.example.demo.customer;

// import java.time.LocalDateTime;

// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EntityListeners;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.validation.constraints.NotNull;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @EntityListeners(AuditingEntityListener.class)
// @AllArgsConstructor
// @NoArgsConstructor
// @Entity
// public class Customer {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotNull
//     @Column(nullable = false)
//     private String name;

    
//     private String phoneNumber;

//     @NotNull
//     @Column(nullable = false)
//     private String email;

//     @CreatedDate
//     private LocalDateTime createdAt;

//     @LastModifiedDate
//     private LocalDateTime updatedAt;

// }


// package com.example.demo.menuItem;

// import java.time.LocalDateTime;

// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import com.example.demo.category.Category;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EntityListeners;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Data
// @EntityListeners(AuditingEntityListener.class)
// @NoArgsConstructor
// @AllArgsConstructor
// public class MenuItem {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotBlank
//     @Column(nullable = false)
//     private String name;

//     @NotBlank
//     @Column(nullable = false)
//     private String description;

//     @NotNull
//     @Column(nullable = false)
//     private Double price;

//     @Column(nullable = false)
//     private String status;

//     @ManyToOne
//     @NotNull
//     @JoinColumn(name = "category_id") // correct way for ManyToOne
//     private Category category;

//     private String imageUrl;

//     @CreatedDate
//     private LocalDateTime createdAt;

//     @LastModifiedDate
//     private LocalDateTime updatedAt;
// }



// package com.example.demo.order;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;

// import org.hibernate.annotations.OnDelete;
// import org.hibernate.annotations.OnDeleteAction;
// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import com.example.demo.auth.Account;
// import com.example.demo.customer.Customer;
// import com.example.demo.table.RestaurantTable;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EntityListeners;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToMany;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Data
// @AllArgsConstructor

// @Table(name = "orders")
// @NoArgsConstructor
// @EntityListeners(AuditingEntityListener.class)
// public class Order {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
//     private List<OrderItem> items = new ArrayList<>();

//     @ManyToOne
//     @JoinColumn(name = "waiter_id", nullable = true)
//     @OnDelete(action = OnDeleteAction.SET_NULL)
//     private Account waiter;

//     @ManyToOne
//     @JoinColumn(name = "table_id")
//     private RestaurantTable table;

//     @ManyToOne()
//     @JoinColumn(name = "customer_id")
//     private Customer customer;

//     private double total;

//     private Integer quantity;

//     private String orderStatus;

//     private String invoiceNumber;

//     private String paymentStatus;

//     @CreatedDate
//     private LocalDateTime createdAt;

//     @LastModifiedDate
//     private LocalDateTime updatedAt;
// }


// package com.example.demo.order;

// import java.time.LocalDateTime;

// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import com.example.demo.menuItem.MenuItem;
// import com.fasterxml.jackson.annotation.JsonIgnore;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EntityListeners;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @EntityListeners(AuditingEntityListener.class)
// public class OrderItem {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @JsonIgnore
//     @ManyToOne
//     @JoinColumn
//     private Order order;

//     @JoinColumn
//     @ManyToOne
//     private MenuItem menuItem;

//     @Column(nullable = false)
//     private boolean takeOut;

//     @Column(nullable = false)
//     private int quantity;

//     @Column(nullable = false)
//     private double price;

//     @CreatedDate
//     private LocalDateTime createdAt;

//     @LastModifiedDate
//     private LocalDateTime updatedAt;
// }


// package com.example.demo.table;

// import java.time.LocalDateTime;

// import org.hibernate.annotations.OnDelete;
// import org.hibernate.annotations.OnDeleteAction;
// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import com.example.demo.auth.Account;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EntityListeners;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @EntityListeners(AuditingEntityListener.class)
// @AllArgsConstructor
// @NoArgsConstructor
// @Data
// public class RestaurantTable {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotBlank
//     @Column(nullable = false)
//     private String tableName;

//     @NotNull
//     @Column(nullable = false)
//     private Integer tableNumber;

//     private Integer capacity;

//     @ManyToOne
//     @JoinColumn(name = "waiter_id")
//     @OnDelete(action = OnDeleteAction.SET_NULL)
//     private Account waiter;

//     private String status;

//     @CreatedDate
//     private LocalDateTime createdAt;

//     @LastModifiedDate
//     private LocalDateTime updatedAt;
// }


// package com.example.demo.table;

// import java.time.LocalDateTime;

// import com.example.demo.auth.Account;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class RestaurantTableAllocation {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     @JoinColumn(name = "table_id", nullable = false)
//     private RestaurantTable table;
    
//     @ManyToOne
//     @JoinColumn(name = "waiter_id", nullable = false)
//     private Account waiter;

//     private LocalDateTime allocatedAt;
//     private LocalDateTime deallocatedAt;
// }
