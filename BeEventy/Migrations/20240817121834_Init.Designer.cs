﻿// <auto-generated />
using System;
using BeEventy.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BeEventy.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240817121834_Init")]
    partial class Init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.17")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BeEventy.Data.Models.Distributor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("SearchAddress")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("search_adress");

                    b.HasKey("Id");

                    b.ToTable("distributor", (string)null);
                });

            modelBuilder.Entity("BeEventy.Data.Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("address");

                    b.Property<int>("AmmountOfBatches")
                        .HasColumnType("integer")
                        .HasColumnName("amount_of_batches");

                    b.Property<int>("AmountOfAllTickets")
                        .HasColumnType("integer")
                        .HasColumnName("amount_of_all_tickets");

                    b.Property<int>("AuthorId")
                        .HasColumnType("integer")
                        .HasColumnName("author_id");

                    b.Property<DateTime>("DateOfEnd")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date_of_end");

                    b.Property<DateTime>("DateOfStart")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date_of_start");

                    b.Property<DateTime>("DateOfUpload")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date_of_upload");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<int>("DistributorId")
                        .HasColumnType("integer")
                        .HasColumnName("distributor_id");

                    b.Property<int>("EventStatus")
                        .HasColumnType("integer")
                        .HasColumnName("event_status");

                    b.Property<int>("EventType")
                        .HasColumnType("integer")
                        .HasColumnName("event_type");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("image");

                    b.Property<bool>("IsConfirmed")
                        .HasColumnType("boolean")
                        .HasColumnName("is_confirmed");

                    b.Property<bool>("IsExpired")
                        .HasColumnType("boolean")
                        .HasColumnName("is_expired");

                    b.Property<bool>("IsSoldOut")
                        .HasColumnType("boolean")
                        .HasColumnName("is_sold_out");

                    b.Property<int>("Location")
                        .HasColumnType("integer")
                        .HasColumnName("location");

                    b.Property<int>("Minuses")
                        .HasColumnType("integer")
                        .HasColumnName("minuses");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<int>("NumberOfReports")
                        .HasColumnType("integer")
                        .HasColumnName("number_of_reports");

                    b.Property<int>("Pluses")
                        .HasColumnType("integer")
                        .HasColumnName("pluses");

                    b.HasKey("Id");

                    b.ToTable("event", (string)null);
                });

            modelBuilder.Entity("BeEventy.Data.Models.Report", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AccountId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<int>("EventId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("report", (string)null);
                });

            modelBuilder.Entity("BeEventy.Data.Models.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<int>("EventId")
                        .HasColumnType("integer")
                        .HasColumnName("event_id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric")
                        .HasColumnName("price");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("type");

                    b.HasKey("Id");

                    b.ToTable("ticket", (string)null);
                });

            modelBuilder.Entity("PostgreSQL.Data.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AccountType")
                        .HasColumnType("integer")
                        .HasColumnName("account_type");

                    b.Property<bool>("ActiveAccount")
                        .HasColumnType("boolean")
                        .HasColumnName("active_account");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("phone_number");

                    b.Property<string>("ProfileImage")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("profile_image");

                    b.HasKey("Id");

                    b.ToTable("account", (string)null);
                });

            modelBuilder.Entity("Vote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("EventId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsPlus")
                        .HasColumnType("boolean");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("vote", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
